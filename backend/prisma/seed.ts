import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	const user = await prisma.user.upsert({
		where: { email: 'demo@student.nav' },
		update: {},
		create: { email: 'demo@student.nav' },
	})
	await prisma.job.createMany({
		data: [
			{ title: 'Стажёр Frontend (React)', meta: { tags: ['react', 'ts', 'nextjs'] } },
			{ title: 'Стажёр Data Analyst', meta: { tags: ['sql', 'excel'] } },
		],
		skipDuplicates: true,
	})
	await prisma.application.create({ data: { userId: user.id, jobId: (await prisma.job.findFirstOrThrow()).id } })
}

main().finally(async () => {
	await prisma.$disconnect()
})
