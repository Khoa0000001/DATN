/* eslint-disable no-useless-escape */
/* eslint-disable no-control-regex */
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class EmbeddingService {
  private readonly GEMINI_API_KEY: string;
  private readonly GEMINI_API_URL: string;

  constructor() {
    this.GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
    if (!this.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not set.');
    }

    this.GEMINI_API_URL =
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-exp-03-07:embedContent';
  }

  private sanitize(text: string): string {
    return text
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // remove control chars
      .replace(/[^\p{L}\p{N}\s.,:;()\-\/@]+/gu, '') // remove special chars
      .replace(/\s+/g, ' ') // collapse whitespace
      .trim()
      .slice(0, 15000); // limit length
  }

  async getEmbedding(text: string): Promise<number[]> {
    try {
      const cleaned = this.sanitize(text);

      const response = await axios.post(
        `${this.GEMINI_API_URL}?key=${this.GEMINI_API_KEY}`,
        {
          model: 'models/gemini-embedding-exp-03-07',
          content: {
            parts: [{ text: cleaned }],
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const embedding =
        response.data?.embedding?.value || response.data?.embedding?.values;

      if (embedding) {
        return embedding;
      } else {
        throw new Error('No embedding returned from API.');
      }
    } catch (error) {
      console.error('Error getting embedding:', error?.response?.data || error);
      throw new Error('Error while fetching embedding from Gemini API.');
    }
  }
}
