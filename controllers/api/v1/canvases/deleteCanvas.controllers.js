import axios from 'axios'

export default async (req, res, next) => {
  res.json({
    type: 'delete canvas',
  })
}
