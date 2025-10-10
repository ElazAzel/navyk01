import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { JobsService } from './jobs.service'

class CreateJobDto { title!: string; meta?: Record<string, unknown> }

@Controller('jobs')
export class JobsController {
	constructor(private readonly jobs: JobsService) {}

	@Get()
	list(@Query('q') q?: string, @Query('limit') limit?: string, @Query('offset') offset?: string) {
		return this.jobs.list({ q, limit: limit ? Number(limit) : undefined, offset: offset ? Number(offset) : undefined })
	}

	@Post()
	create(@Body() body: CreateJobDto) {
		return this.jobs.create({ title: body.title, meta: body.meta })
	}

	@Get(':id')
	get(@Param('id') id: string) {
		return this.jobs.get(id)
	}
}
