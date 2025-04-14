// 📁 mail/mail.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as os from 'os';
import { formatResponse } from '@/utils/response.util';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_SENT,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendVerificationLink(to: string, code: string) {
    const port = process.env.PORT || 5000;
    const apiPrefix = `api/${process.env.API_VERSION || 'v1'}`;
    // Lấy địa chỉ IP của máy trong mạng LAN
    const networkInterfaces = os.networkInterfaces();
    const localIP =
      Object.values(networkInterfaces)
        .flat()
        .find((iface) => iface?.family === 'IPv4' && !iface.internal)
        ?.address || 'localhost';
    const link = `http://${localIP}:${port}/${apiPrefix}/auth/verify?email=${to}&code=${code}`;
    const mailOptions = {
      from: `"Sell PC" <${process.env.EMAIL_SENT}>`,
      to,
      subject: 'Xác thực tài khoản',
      html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
            <h2 style="color: #4CAF50;">👋 Chào bạn!</h2>
            <p>Chúng tôi đã nhận được yêu cầu đăng ký tài khoản bằng email <strong>${to}</strong>.</p>
            <p>Vui lòng nhấn vào nút bên dưới để xác thực tài khoản của bạn:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${link}" 
                style="padding: 12px 24px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
                ✅ Xác thực tài khoản
              </a>
            </div>
            <p>Nếu bạn không đăng ký tài khoản, vui lòng bỏ qua email này.</p>
            <hr style="margin-top: 40px;">
            <p style="font-size: 12px; color: #888;">Email được gửi tự động từ hệ thống. Vui lòng không trả lời email này.</p>
          </div>
        `,
    };

    await this.transporter.sendMail(mailOptions);
    return formatResponse('Verification email sent successfully');
  }
}
