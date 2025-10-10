import crypto from 'crypto'

const ALGO = 'aes-256-gcm'
const IV_LENGTH = 12 // GCM стандартный IV 96 бит
const TAG_LENGTH = 16

function getMasterKeyFromEnv(varName = 'OPENAI_MASTER_KEY_HEX'): Buffer {
	const hex = process.env[varName]
	if (!hex) throw new Error(`${varName} is not set`)
	const key = Buffer.from(hex, 'hex')
	if (key.length !== 32) throw new Error(`${varName} must be 32 bytes (64 hex chars)`) 
	return key
}

export function encryptSecret(plainUtf8: string, masterKey?: Buffer): string {
	const key = masterKey ?? getMasterKeyFromEnv()
	const iv = crypto.randomBytes(IV_LENGTH)
	const cipher = crypto.createCipheriv(ALGO, key, iv)
	const ciphertext = Buffer.concat([cipher.update(Buffer.from(plainUtf8, 'utf8')), cipher.final()])
	const tag = cipher.getAuthTag()
	// Формат: [IV(12)][TAG(16)][CIPHERTEXT]
	return Buffer.concat([iv, tag, ciphertext]).toString('base64')
}

export function decryptSecret(b64: string, masterKey?: Buffer): string {
	const key = masterKey ?? getMasterKeyFromEnv()
	const buf = Buffer.from(b64, 'base64')
	if (buf.length < IV_LENGTH + TAG_LENGTH + 1) throw new Error('Invalid ciphertext')
	const iv = buf.subarray(0, IV_LENGTH)
	const tag = buf.subarray(IV_LENGTH, IV_LENGTH + TAG_LENGTH)
	const ciphertext = buf.subarray(IV_LENGTH + TAG_LENGTH)
	const decipher = crypto.createDecipheriv(ALGO, key, iv)
	decipher.setAuthTag(tag)
	const plain = Buffer.concat([decipher.update(ciphertext), decipher.final()])
	return plain.toString('utf8')
}
