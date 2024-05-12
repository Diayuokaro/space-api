import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import crypto from 'node:crypto'
import User from '#models/user.models.js'
import Session from '#models/session.models.js'

export default async (req, res, next) => {
  switch (req.body.grant_type) {
    case 'refresh_token': {
      const accessToken = req.headers.authorization?.replace('Bearer ', ''),
      { refresh_token: refreshToken } = req.body
      if (!accessToken) return res.status(401).json({ message: 'Invalid access token' })
      if (!refreshToken) return res.status(401).json({ message: 'Invalid refresh token' })

      const accessTokenSignature = accessToken.split('.').pop()
      if (!accessTokenSignature) return res.status(401).json({ message: 'Invalid access token' })

      const accessTokenDecoded = await jwt.verify(accessToken, 'shhhhh', { ignoreExpiration: true }, (err, decoded) => decoded)
      if (!accessTokenDecoded?.sessionId) return res.status(401).json({ message: 'Invalid access token' })

      const session = await Session.getById(accessTokenDecoded.sessionId)
      if (!session || !await bcrypt.compare(accessTokenSignature, session.accessToken)) return res.status(401).json({ message: 'Invalid access token' })
      if (!await bcrypt.compare(refreshToken, session.refreshToken)) return res.status(401).json({ message: 'Invalid refresh token' })

      const newAccessToken = jwt.sign({
        sessionId: session._id,
      }, 'shhhhh', { expiresIn: '1h' }),
      newAccessTokenSignature = newAccessToken.split('.').pop(),
      newAccessTokenHash = await bcrypt.hash(newAccessTokenSignature, 10),
      newRefreshToken = crypto.randomBytes(32).toString('hex'),
      newRefreshTokenHash = await bcrypt.hash(newRefreshToken, 10),
      newSession = await Session.updateById(session._id, {
        accessToken: newAccessTokenHash,
        refreshToken: newRefreshTokenHash,
      })

      await res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        expiresIn: 3600,
      })

      break
    }

    default: {
      const {
        username,
        password,
        timezone,
        language,
        geolocation,
        clientType,
        deviceName,
        deviceVendor,
        operatingSystem,
      } = req.body,
      ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
      if (!username || !password) return res.status(401).json({ message: 'Invalid credentials' })

      const user = await User.getByUsername(username)
      if (!user || !await bcrypt.compare(password, user.password)) return res.status(401).json({ message: 'Invalid credentials' })

      const sessionId = new mongoose.Types.ObjectId(),
      accessToken = jwt.sign({
        sessionId: sessionId,
      }, 'shhhhh', { expiresIn: '1h' }),
      accessTokenSignature = accessToken.split('.').pop(),
      accessTokenHash = await bcrypt.hash(accessTokenSignature, 10),
      refreshToken = crypto.randomBytes(32).toString('hex'),
      refreshTokenHash = await bcrypt.hash(refreshToken, 10),
      session = await Session.create({
        accessToken: accessTokenHash,
        refreshToken: refreshTokenHash,
        user: user._id,
        ip,
        timezone,
        language,
        geolocation,
        clientType,
        deviceName,
        deviceVendor,
        operatingSystem,
        _id: sessionId,
      })

      await res.status(200).json({
        accessToken,
        refreshToken,
        expiresIn: 3600,
      })

    }
  }
}
