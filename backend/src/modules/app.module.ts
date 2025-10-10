import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TerminusModule } from '@nestjs/terminus'
import { HealthController } from '../shared/health.controller'
import { PrismaModule } from '../shared/prisma.module'
import { RedisModule } from '../shared/redis.module'
import { AuthModule } from './auth/auth.module'
import { ProfilesModule } from './profiles/profiles.module'
import { SecretsService } from '../shared/secrets.service'
import { JobsModule } from './jobs/jobs.module'
import { ApplicationsModule } from './applications/applications.module'
import { AiModule } from './ai/ai.module'
import { AnalyticsModule } from './analytics/analytics.module'
import { NotificationsModule } from './notifications/notifications.module'
import { PaymentsModule } from './payments/payments.module'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TerminusModule,
		PrismaModule,
		RedisModule,
		AuthModule,
		ProfilesModule,
		JobsModule,
		ApplicationsModule,
		AiModule,
		AnalyticsModule,
		NotificationsModule,
		PaymentsModule,
	],
	controllers: [HealthController],
	providers: [SecretsService],
})
export class AppModule {}
