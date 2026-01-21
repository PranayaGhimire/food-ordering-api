/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async sendResetPasswordEmail(email: string, resetLink: string) {
    await this.transporter.sendMail({
      from: `"The Momo House" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'Reset your password',
      html: `
            <h2>Password Reset</h2>
            <p>You requested to reset your password.</p>
            <p>Click the link below:</p>
            <a href="${resetLink}">${resetLink}</a>
            <p>This link expires in 15 minutes.</p>
        `,
    });
  }
}
