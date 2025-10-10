import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class JobsService {
	constructor(private readonly prisma: PrismaClient) {}

	list(params: { q?: string; limit?: number; offset?: number }) {
		const { q, limit = 20, offset = 0 } = params
		return this.prisma.job.findMany({
			where: q
				? {
					title: { contains: q, mode: 'insensitive' },
				}
				: undefined,
			take: limit,
			skip: offset,
			orderBy: { createdAt: 'desc' },
		})
	}

	create(data: { title: string; meta?: Record<string, unknown> }) {
		return this.prisma.job.create({ data })
	}

	get(id: string) {
		return this.prisma.job.findUnique({ where: { id } })
	}
}
