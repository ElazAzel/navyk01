import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class ProfilesService {
	constructor(private readonly prisma: PrismaClient) {}

	getByUserId(userId: string) {
		return this.prisma.profile.findUnique({ where: { userId } })
	}

	upsert(userId: string, profileData: Record<string, unknown>) {
		return this.prisma.profile.upsert({
			where: { userId },
			create: { userId, profileData },
			update: { profileData },
		})
	}
}
