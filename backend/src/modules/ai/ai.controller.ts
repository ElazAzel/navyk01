import { Body, Controller, Post } from '@nestjs/common'
import { AiService } from './ai.service'

class RecommendDto { profile!: Record<string, unknown> }
class ParseDto { text!: string }

@Controller('ai')
export class AiController {
	constructor(private readonly ai: AiService) {}

	@Post('recommendations')
	recommend(@Body() body: RecommendDto) {
		return this.ai.recommendJobs(body.profile)
	}

	@Post('parse-resume')
	parse(@Body() body: ParseDto) {
		return this.ai.parseResume(body.text)
	}
}
