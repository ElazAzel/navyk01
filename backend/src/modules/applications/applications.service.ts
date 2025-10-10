import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class ApplicationsService {
	constructor(private readonly prisma: PrismaClient) {}

	create(data: { userId: string; jobId: string }) {
		return this.prisma.application.create({ data })
	}

	listByUser(userId: string) {
		return this.prisma.application.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } })
	}
}
