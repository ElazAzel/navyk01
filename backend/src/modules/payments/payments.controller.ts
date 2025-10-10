import { Body, Controller, Post, Headers, Req } from '@nestjs/common'
import { PaymentsService } from './payments.service'

class CheckoutDto { priceId!: string; successUrl!: string; cancelUrl!: string }

@Controller('payments')
export class PaymentsController {
	constructor(private readonly payments: PaymentsService) {}

	@Post('checkout')
	createCheckout(@Body() body: CheckoutDto) {
		return this.payments.createCheckoutSession({ priceId: body.priceId, successUrl: body.successUrl, cancelUrl: body.cancelUrl })
	}

	@Post('webhook')
	webhook(@Headers('stripe-signature') signature: string | undefined, @Req() req: any) {
		return this.payments.verifyWebhook(signature, req.rawBody || Buffer.from(JSON.stringify(req.body)))
	}
}
