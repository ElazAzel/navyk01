import { Injectable } from '@nestjs/common'
import { SecretsService } from '../../shared/secrets.service'

@Injectable()
export class AiService {
	constructor(private readonly secrets: SecretsService) {}

	async recommendJobs(profile: Record<string, unknown>) {
		const key = this.secrets.getOpenAIKey()
		if (!key) {
			return { source: 'static', items: this.staticRecommend(profile) }
		}
		// Тут можно интегрировать вызов LLM (OpenAI) при наличии ключа
		return { source: 'llm', items: this.staticRecommend(profile) }
	}

	async parseResume(text: string) {
		const key = this.secrets.getOpenAIKey()
		if (!key) {
			return { source: 'static', skills: this.staticExtractSkills(text) }
		}
		// Тут можно интегрировать вызов LLM (OpenAI) при наличии ключа
		return { source: 'llm', skills: this.staticExtractSkills(text) }
	}

	private staticRecommend(profile: Record<string, unknown>) {
		const skills = Array.isArray((profile as any)?.skills) ? (profile as any).skills : []
		return [
			{ id: 'rec-1', title: 'Стажёр Frontend (React)', match: skills.includes('react') ? 0.9 : 0.6 },
			{ id: 'rec-2', title: 'Стажёр Data Analyst', match: skills.includes('sql') ? 0.85 : 0.55 },
		]
	}

	private staticExtractSkills(text: string) {
		const lower = text.toLowerCase()
		const dict = ['react', 'node', 'python', 'sql', 'excel', 'java', 'docker']
		return dict.filter((k) => lower.includes(k))
	}
}
