import process from 'node:process'

export default {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:35115/myapp',
  mongo: {
    connectTimeoutMs: Number(process.env.MONGO_CONNECT_TIMEOUT_MS || 5000),
    fallbackToMemory: process.env.MONGO_FALLBACK_TO_MEMORY !== 'false',
    memoryServerVersion: process.env.MONGO_MEMORY_SERVER_VERSION || '7.0.14',
  },
  fastify: {
    pluginTimeoutMs: Number(process.env.FASTIFY_PLUGIN_TIMEOUT_MS || 10 * 60 * 1000),
  },
  appBaseUrl: process.env.APP_BASE_URL || `http://localhost:${process.env.PORT || 3000}`,
  frontBaseUrl: process.env.FRONT_BASE_URL || 'http://localhost:5173',
  jwt: {
    secret: process.env.JWT_SECRET || 'change-me-in-production',
    cookieName: process.env.JWT_COOKIE_NAME || 'token',
  },
  security: {
    bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUNDS || 12),
    loginMaxAttempts: Number(process.env.LOGIN_MAX_ATTEMPTS || 5),
    loginWindowMs: Number(process.env.LOGIN_WINDOW_MS || 15 * 60 * 1000),
  },
  mail: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    from: process.env.MAIL_FROM || 'no-reply@example.com',
  },
}
