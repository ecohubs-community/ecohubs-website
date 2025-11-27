import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

let transporter: Transporter | null = null;

export function getEmailTransporter(): Transporter {
	if (transporter) {
		return transporter;
	}

	const smtpHost = process.env.SMTP_HOST || 'localhost';
	const smtpPort = parseInt(process.env.SMTP_PORT || '1025');
	const smtpSecure = process.env.SMTP_SECURE === 'true';
	const smtpUser = process.env.SMTP_USER || '';
	const smtpPassword = process.env.SMTP_PASSWORD || '';

	transporter = nodemailer.createTransporter({
		host: smtpHost,
		port: smtpPort,
		secure: smtpSecure,
		auth: smtpUser && smtpPassword ? {
			user: smtpUser,
			pass: smtpPassword,
		} : undefined,
		// For development with services like MailHog/Mailpit
		...(smtpHost === 'localhost' && {
			tls: {
				rejectUnauthorized: false
			}
		})
	});

	return transporter;
}

export interface SendEmailOptions {
	to: string | string[];
	subject: string;
	text: string;
	html: string;
	replyTo?: string;
}

export async function sendEmail(options: SendEmailOptions): Promise<void> {
	const transporter = getEmailTransporter();
	
	const emailFrom = process.env.EMAIL_FROM || 'noreply@ecohubs.community';
	const emailFromName = process.env.EMAIL_FROM_NAME || 'EcoHubs Community';

	await transporter.sendMail({
		from: `"${emailFromName}" <${emailFrom}>`,
		to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
		subject: options.subject,
		text: options.text,
		html: options.html,
		replyTo: options.replyTo,
	});
}

export async function verifyEmailConnection(): Promise<boolean> {
	try {
		const transporter = getEmailTransporter();
		await transporter.verify();
		return true;
	} catch (error) {
		console.error('Email connection verification failed:', error);
		return false;
	}
}

