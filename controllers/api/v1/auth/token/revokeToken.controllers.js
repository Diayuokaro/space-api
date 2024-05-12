import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import Session from '#models/session.models.js'

export default async (req, res, next) => {
  const accessToken = req.headers.authorization?.replace('Bearer ', '')
  if (!accessToken) return res.status(401).json({ message: 'Invalid access token' })

  const accessTokenSignature = accessToken.split('.').pop()
  if (!accessTokenSignature) return res.status(401).json({ message: 'Invalid access token' })

  const accessTokenDecoded = await jwt.verify(accessToken, 'shhhhh', { ignoreExpiration: true }, (err, decoded) => decoded)
  if (!accessTokenDecoded?.sessionId) return res.status(401).json({ message: 'Invalid access token' })

  const session = await Session.getById(accessTokenDecoded.sessionId)
  if (!session || !await bcrypt.compare(accessTokenSignature, session.accessToken)) return res.status(401).json({ message: 'Invalid access token' })

  const revokedSession = await Session.deleteById(session._id)
  // if (!revokedSession) return res.status(401).json({ message: 'Invalid access token' })

  await res.status(200).json({ message: 'Token revoked succefully' })
}
