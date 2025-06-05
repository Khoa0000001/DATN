import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GeminiService {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly logger = new Logger(GeminiService.name);

  constructor(
    private _httpService: HttpService,
    private _configService: ConfigService,
  ) {
    this.apiKey = this._configService.get<string>('GEMINI_API_KEY') || '';
    this.baseUrl = this._configService.get<string>('GEMINI_BASE_URL') || '';
  }

  async generate(prompt: string): Promise<string> {
    const url = `${this.baseUrl}?key=${this.apiKey}`;
    const body = {
      contents: [{ parts: [{ text: prompt }] }],
    };

    const maxRetries = 10;
    let attempt = 0;

    while (attempt < maxRetries) {
      try {
        const response = await firstValueFrom(
          this._httpService.post(url, body),
        );
        return (
          response.data?.candidates?.[0]?.content?.parts?.[0]?.text ??
          'Không có phản hồi từ Gemini'
        );
      } catch (error: any) {
        this.logger.warn(
          `Attempt ${attempt + 1} to call Gemini API failed: ${error.message}`,
        );

        if (error.response?.status === 503 && attempt < maxRetries - 1) {
          attempt++;
          // đợi 2 giây rồi thử lại
          await new Promise((resolve) => setTimeout(resolve, 2000));
        } else {
          // Nếu không phải lỗi 503 hoặc hết số lần thử thì ném lỗi ra ngoài
          throw error;
        }
      }
    }
    // Nếu vòng while bị lỗi hết retry thì trả về thông báo
    return 'Gemini API hiện đang quá tải, vui lòng thử lại sau.';
  }
}
