import axios from 'axios'

export default async (req, res, next) => {
  const {
    username,
    password,
  } = req.body

  if (!username || !password) return res.status(401).json({ message: 'Invalid credentials' })

  const passwordHash = await bcrypt.hash(password, 10)

  const user = await User.create({
    username,
    password: passwordHash,
  })
  // if (!user) return res.status(401).json({ message: 'Invalid access token' })

  await res.status(200).json(user)
}
