import type { NextApiHandler } from 'next'

const countHandler: NextApiHandler = (request, response) => {
  response.json({ count: Math.ceil(Math.random() * 10) })
}

export default countHandler
