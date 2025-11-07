import { envServer } from '@/config/env'

import mailer from './mailer'

const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const info = await mailer.sendMail({
      from: `"${envServer.MAILJET_FROM_NAME}" <${envServer.MAILJET_FROM_EMAIL}>`,
      to,
      subject,
      html,
    })

    console.log(info)

    return info
  } catch (error) {
    console.log(error)

    throw error
  }
}

export default sendEmail
