import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaClient) {}

	findByEmail(email: string) {
		return this.prisma.user.findUnique({ where: { email } })
	}

	createEmailUser(email: string) {
		return this.prisma.user.create({ data: { email } })
	}
}
