import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class AnalyticsService {
	constructor(private readonly prisma: PrismaClient) {}

	logEvent(type: string, userId?: string, meta?: Record<string, unknown>) {
		return this.prisma.event.create({ data: { type, userId, meta } })
	}

	countApplicationsLast30d() {
		const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
		return this.prisma.application.count({ where: { createdAt: { gte: since } } })
	}

	countNewUsersLast30d() {
		const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
		return this.prisma.user.count({ where: { createdAt: { gte: since } } })
	}
}
