import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ProfilesService } from './profiles.service'

class ProfileDto { profileData!: Record<string, unknown> }

@Controller('profiles')
export class ProfilesController {
	constructor(private readonly profiles: ProfilesService) {}

	@Get(':userId')
	get(@Param('userId') userId: string) {
		return this.profiles.getByUserId(userId)
	}

	@Post(':userId')
	upsert(@Param('userId') userId: string, @Body() body: ProfileDto) {
		return this.profiles.upsert(userId, body.profileData)
	}
}
