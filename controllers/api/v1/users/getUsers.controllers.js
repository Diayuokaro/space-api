import axios from 'axios'

export default async (req, res, next) => {
  await res.status(200).json({
    type: 'get users',
  })
}
