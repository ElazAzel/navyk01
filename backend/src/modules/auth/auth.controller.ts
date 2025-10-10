import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'

class EmailDto { email!: string }

@Controller('auth')
export class AuthController {
	constructor(private readonly auth: AuthService) {}

	@Post('email')
	signInWithEmail(@Body() body: EmailDto) {
		return this.auth.signInWithEmail(body.email)
	}
}
