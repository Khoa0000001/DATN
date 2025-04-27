// src/upload/image-upload.service.ts
import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class ImageUploadService {
  async uploadImage(buffer: Buffer, filename: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'CPTimages',
          public_id: filename,
        },
        (error, result) => {
          if (error)
            return reject(
              new Error(
                error.message || 'An error occurred during image upload',
              ),
            );
          resolve(result?.secure_url || '');
        },
      );
      Readable.from(buffer).pipe(stream);
    });
  }
}
