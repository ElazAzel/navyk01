import { Injectable } from '@nestjs/common'
import { decryptSecret } from './crypto'

@Injectable()
export class SecretsService {
	getOpenAIKey(): string | undefined {
		const enc = process.env.OPENAI_API_KEY_ENC
		if (!enc) return process.env.OPENAI_API_KEY
		return decryptSecret(enc)
	}
}
