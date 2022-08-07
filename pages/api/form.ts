import type { NextApiRequest, NextApiResponse } from 'next'
import applyRateLimit from '../../lib/applyRateLimit'
import sendgrid from '@sendgrid/mail'

type FormRequest = {
  firstname: string,
  lastname: string,
  email: string,
  dob: string,
  subject: string,
  body: string,
  attachments: Attachment[]
}

type Attachment = {
  filename: string,
  type: string,
  content: string,
  content_id: 'cv',
  disposition: 'attachment'
}

type FormResponse = {
  code?: number | string,
  message: string
}

const sendEmail = async (req: NextApiRequest, res: NextApiResponse<FormResponse>) => {
  if (process.env.ENVIRONMENT === 'PRODUCTION') {
    try {
      await applyRateLimit(req, res)
    } catch {
      return res.status(429).json({ code: 429, message: 'Too many requests' })
    }
  }
  if (req.method === 'POST') {
    if (!!process.env.SENDGRID_KEY && !!process.env.EMAIL_TO && !!process.env.EMAIL_FROM) {

      sendgrid.setApiKey(process.env.SENDGRID_KEY)

      const body: FormRequest = JSON.parse(req.body)

      const message = `
        First name: ${body.firstname}\r\n
        Last name: ${body.lastname}\r\n
        Email: ${body.email}\r\n
        DOB: ${body.dob}\r\n
        Body: ${body.body}
      `

      const data = {
        to: process.env.EMAIL_TO,
        from: process.env.EMAIL_FROM,
        subject: body.subject,
        text: message,
        html: message.replace(/\r\n/g, '<br>'),
        attachments: body.attachments
      }

      sendgrid.send(data).then(() => {
        res.status(200).json({ message: 'Email sent' })
      })

    } else {
      res.status(418).json({ code: 418, message: 'Missing email environment variable(s)' })
    }
  } else {
    res.status(405).json({ code: 405, message: 'Method not allowed' })
  }

}

export default sendEmail
