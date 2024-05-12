import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import crypto from 'node:crypto'
import User from '#models/user.models.js'
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

  const user = await User.getById(session.user),
  sess = await Session.getById(req.params.sessionId)
  if (String(sess.user) !== String(user._id)) return res.status(403).json({ message: 'Forbidden' })

  const revokedSession = await Session.deleteById(sess._id)

  await res.status(200).json({ message: 'Token revoked succefully' })
}
