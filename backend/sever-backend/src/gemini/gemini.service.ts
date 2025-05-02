import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config'; // ✅ Thêm vào
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GeminiService {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(
    private _httpService: HttpService,
    private _configService: ConfigService, // ✅ Inject vào
  ) {
    this.apiKey = this._configService.get<string>('GEMINI_API_KEY') || '';
    this.baseUrl = this._configService.get<string>('GEMINI_BASE_URL') || '';
  }

  async generate(prompt: string): Promise<string> {
    const url = `${this.baseUrl}?key=${this.apiKey}`;
    const body = {
      contents: [{ parts: [{ text: prompt }] }],
    };

    const response = await firstValueFrom(this._httpService.post(url, body));
    return (
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      'Không có phản hồi từ Gemini'
    );
  }
}
