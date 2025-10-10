import { Injectable } from '@nestjs/common'
import nodemailer from 'nodemailer'
import TelegramBot from 'node-telegram-bot-api'

@Injectable()
export class NotificationsService {
	private transporter = process.env.SMTP_HOST
		? nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: Number(process.env.SMTP_PORT || 587),
			secure: false,
			auth: process.env.SMTP_USER && process.env.SMTP_PASS ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
		})
		: null

	private bot = process.env.TELEGRAM_BOT_TOKEN ? new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false }) : null

	async sendEmail(to: string, subject: string, text: string) {
		if (!this.transporter) return { skipped: true }
		await this.transporter.sendMail({ from: process.env.SMTP_FROM || 'no-reply@navyk', to, subject, text })
		return { ok: true }
	}

	async sendTelegram(chatId: string | number, text: string) {
		if (!this.bot) return { skipped: true }
		await this.bot.sendMessage(chatId, text, { disable_web_page_preview: true })
		return { ok: true }
	}
}
