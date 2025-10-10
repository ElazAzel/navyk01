import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
	constructor(private users: UsersService, private jwt: JwtService) {}

	async signInWithEmail(email: string) {
		let user = await this.users.findByEmail(email)
		if (!user) user = await this.users.createEmailUser(email)
		const payload = { sub: user.id, role: 'student' }
		return { access_token: await this.jwt.signAsync(payload) }
	}

	async verify(token: string) {
		try {
			return await this.jwt.verifyAsync(token)
		} catch {
			throw new UnauthorizedException()
		}
	}
}
