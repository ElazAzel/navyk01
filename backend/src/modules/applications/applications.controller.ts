import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApplicationsService } from './applications.service'

class ApplyDto { userId!: string; jobId!: string }

@Controller('applications')
export class ApplicationsController {
	constructor(private readonly applications: ApplicationsService) {}

	@Post()
	apply(@Body() body: ApplyDto) {
		return this.applications.create({ userId: body.userId, jobId: body.jobId })
	}

	@Get('user/:userId')
	listByUser(@Param('userId') userId: string) {
		return this.applications.listByUser(userId)
	}
}
