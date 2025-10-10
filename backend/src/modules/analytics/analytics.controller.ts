import { Body, Controller, Get, Post } from '@nestjs/common'
import { AnalyticsService } from './analytics.service'

class LogDto { type!: string; userId?: string; meta?: Record<string, unknown> }

@Controller('analytics')
export class AnalyticsController {
	constructor(private readonly analytics: AnalyticsService) {}

	@Post('log')
	log(@Body() body: LogDto) {
		return this.analytics.logEvent(body.type, body.userId, body.meta)
	}

	@Get('kpi')
	kpi() {
		return Promise.all([
			this.analytics.countApplicationsLast30d(),
			this.analytics.countNewUsersLast30d(),
		]).then(([apps30d, users30d]) => ({ apps30d, users30d }))
	}
}
