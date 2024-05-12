import useDatabase from '#database/index.js'
import express from './express.js'
import { serverPort } from '#config/index.js'

export default async () => {
  await useDatabase()

  await express(serverPort)
}
