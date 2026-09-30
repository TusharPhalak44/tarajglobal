/**
 * Simple in-memory JWT token blacklist.
 * On logout, tokens are added here and checked on every authenticated request.
 * Tokens are automatically pruned when they naturally expire.
 */

const blacklistedTokens = new Map()

export const blacklistToken = (tokenId, expiresAt) => {
  blacklistedTokens.set(tokenId, expiresAt * 1000)
}

export const isTokenBlacklisted = (tokenId) => {
  if (!blacklistedTokens.has(tokenId)) return false
  const expiresAt = blacklistedTokens.get(tokenId)
  if (Date.now() > expiresAt) {
    blacklistedTokens.delete(tokenId)
    return false
  }
  return true
}

setInterval(() => {
  const now = Date.now()
  for (const [tokenId, expiresAt] of blacklistedTokens.entries()) {
    if (now > expiresAt) blacklistedTokens.delete(tokenId)
  }
}, 15 * 60 * 1000)

export default { blacklistToken, isTokenBlacklisted }
