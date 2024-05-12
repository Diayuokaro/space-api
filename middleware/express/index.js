import cors from 'cors'
import express from 'express'

export default async (app) => {
  await app.use(cors())
  await app.use(express.json({ limit: '24mb' }))
  await app.use(express.urlencoded({
    limit: '24mb',
    extended: true,
    parameterLimit: 24000,
  }))
}
