import { Module } from '@nestjs/common'
import { AiService } from './ai.service'
import { AiController } from './ai.controller'
import { SecretsService } from '../../shared/secrets.service'

@Module({
	controllers: [AiController],
	providers: [AiService, SecretsService],
	exports: [AiService],
})
export class AiModule {}
