import type { NextApiRequest, NextApiResponse } from 'next'
import applyRateLimit from '../../lib/applyRateLimit'
import { ApodResponse, ErrorResponse } from '../../types/types'



const getImages = async (req: NextApiRequest, res: NextApiResponse<ApodResponse | ErrorResponse>) => {
  if (process.env.ENVIRONMENT === 'PRODUCTION') {
    try {
      await applyRateLimit(req, res)
    } catch {
      return res.status(429).json({ code: 429, message: 'Too many requests' })
    }
  }
  if (!!process.env.APOD_URL && !!process.env.APOD_KEY) {

    const params = new URLSearchParams({
      api_key: process.env.APOD_KEY,
      count: '6',
      thumbs: 'true'
    })

    const data = await fetch(`${process.env.APOD_URL}?${params}`)
    const images: ApodResponse = await data.json()

    res.status(200).json(images)

  } else {
    res.status(418).json({ code: 418, message: 'Missing APOD URL and/or API key' })
  }

}

export default getImages
