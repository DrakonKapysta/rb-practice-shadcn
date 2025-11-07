import nodemailer from 'nodemailer'

import { envServer } from '@/config/env'

const mailer = nodemailer.createTransport({
  host: 'in-v3.mailjet.com',
  port: 587,
  auth: {
    user: envServer.MAILJET_API_KEY,
    pass: envServer.MAILJET_API_SECRET,
  },
})

export default mailer
