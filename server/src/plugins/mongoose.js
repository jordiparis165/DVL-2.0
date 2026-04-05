import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'

import config from '../config.js'

/**
 * @param {import("fastify").FastifyInstance} fastify
 */
async function mongoosePlugin(fastify) {
  let memoryServer = null

  fastify.log.info({ mongoUri: config.mongoUri }, 'Connecting to MongoDB...')

  try {
    await mongoose.connect(config.mongoUri, {
      serverSelectionTimeoutMS: config.mongo.connectTimeoutMs,
    })
    fastify.log.info('Connected to MongoDB')
  } catch (error) {
    const canFallback = config.env !== 'production' && config.mongo.fallbackToMemory

    fastify.log.error({
      err: error,
      mongoUri: config.mongoUri,
    }, 'Failed to connect to MongoDB')

    if (!canFallback) {
      throw error
    }

    fastify.log.warn('Falling back to in-memory MongoDB for development')
    memoryServer = await MongoMemoryServer.create({
      binary: {
        version: config.mongo.memoryServerVersion,
      },
    })
    await mongoose.connect(memoryServer.getUri(), {
      serverSelectionTimeoutMS: config.mongo.connectTimeoutMs,
    })
    fastify.log.info({
      mongoUri: memoryServer.getUri(),
    }, 'Connected to in-memory MongoDB')
  }

  fastify.addHook('onClose', async () => {
    await mongoose.connection.close()

    if (memoryServer) {
      await memoryServer.stop()
    }
  })
}

export default mongoosePlugin
