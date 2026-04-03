import bcrypt from 'bcryptjs'

import config from '../config.js'

const DEFAULT_SALT_ROUNDS = 12
const saltRounds = Number.isInteger(config.security.bcryptSaltRounds) && config.security.bcryptSaltRounds >= 10
  ? config.security.bcryptSaltRounds
  : DEFAULT_SALT_ROUNDS

export async function hashPassword(password) {
  return bcrypt.hash(password, saltRounds)
}

export async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash)
}

export function needsPasswordRehash(hash) {
  const hashParts = hash.split('$')
  const hashCost = Number(hashParts[2])

  return !Number.isInteger(hashCost) || hashCost < saltRounds
}
