import { Injectable } from '@nestjs/common'
import Stripe from 'stripe'

@Injectable()
export class PaymentsService {
	private stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' }) : null

	async createCheckoutSession(params: { priceId: string; successUrl: string; cancelUrl: string }) {
		if (!this.stripe) return { error: 'Stripe not configured' }
		const session = await this.stripe.checkout.sessions.create({
			mode: 'subscription',
			line_items: [{ price: params.priceId, quantity: 1 }],
			success_url: params.successUrl,
			cancel_url: params.cancelUrl,
		})
		return { id: session.id, url: session.url }
	}

	verifyWebhook(signature: string | undefined, rawBody: Buffer) {
		if (!this.stripe || !process.env.STRIPE_WEBHOOK_SECRET) return { error: 'Webhook not configured' }
		try {
			const event = this.stripe.webhooks.constructEvent(rawBody, signature || '', process.env.STRIPE_WEBHOOK_SECRET)
			return { ok: true, type: event.type }
		} catch (e) {
			return { error: 'Invalid signature' }
		}
	}
}
