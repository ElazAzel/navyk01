#!/usr/bin/env ts-node
/*
Использование:
OPENAI_MASTER_KEY_HEX=... ts-node scripts/encrypt-openai-key.ts sk-....
Выводит base64 шифртекст, который можно записать в OPENAI_API_KEY_ENC.
*/
import { encryptSecret } from '../src/shared/crypto'

const key = process.argv[2]
if (!key) {
	console.error('Usage: encrypt-openai-key.ts <OPENAI_KEY>')
	process.exit(1)
}

const enc = encryptSecret(key)
console.log(enc)
