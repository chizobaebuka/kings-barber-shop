// src/utils/emailService.ts
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import logger from '../config/logger';

dotenv.config();

interface EmailOptions {
    to: string;
    subject: string;
    html: string;
}

class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    }

    async sendEmail({ to, subject, html }: EmailOptions): Promise<void> {
        try {
            await this.transporter.sendMail({
                from: `"Barber Shop Queue" <${process.env.EMAIL_USER}>`,
                to,
                subject,
                html
            });
            logger.info(`Email sent to ${to}`);
        } catch (error) {
            logger.error('Email sending failed:', error);
            throw new Error('Failed to send email');
        }
    }

    async sendQueueConfirmation(email: string, name: string, position: number, estimatedTime: number): Promise<void> {
        const html = `
      <h1>Queue Confirmation</h1>
      <p>Hello ${name},</p>
      <p>You have been added to the queue at our Barber Shop.</p>
      <p>Your position in queue: <strong>${position}</strong></p>
      <p>Estimated wait time: <strong>${estimatedTime} minutes</strong></p>
      <p>We'll notify you when it's almost your turn.</p>
      <p>Thank you for choosing our services!</p>
    `;

        await this.sendEmail({
            to: email,
            subject: 'Queue Confirmation - Barber Shop',
            html
        });
    }

    async sendQueueUpdate(email: string, name: string, position: number, estimatedTime: number): Promise<void> {
        const html = `
      <h1>Queue Update</h1>
      <p>Hello ${name},</p>
      <p>Your position in the queue has been updated.</p>
      <p>Your current position: <strong>${position}</strong></p>
      <p>Estimated wait time: <strong>${estimatedTime} minutes</strong></p>
      <p>Thank you for your patience!</p>
    `;

        await this.sendEmail({
            to: email,
            subject: 'Queue Update - Barber Shop',
            html
        });
    }

    async sendReadyNotification(email: string, name: string): Promise<void> {
        const html = `
      <h1>It's Your Turn!</h1>
      <p>Hello ${name},</p>
      <p>It's your turn now! Please proceed to the reception desk.</p>
      <p>Thank you for choosing our Barber Shop!</p>
    `;

        await this.sendEmail({
            to: email,
            subject: 'Your Turn - Barber Shop',
            html
        });
    }
}

export default new EmailService();