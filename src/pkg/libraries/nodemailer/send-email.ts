import { envServer } from '@/config/env'
import { loggerUtil } from '@/pkg/utils/logger'

import mailer from './mailer'

const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const info = await mailer.sendMail({
      from: `"${envServer.MAILJET_FROM_NAME}" <${envServer.MAILJET_FROM_EMAIL}>`,
      to,
      subject,
      html,
    })

    loggerUtil({ text: 'Email sent', value: info })

    return info
  } catch (error) {
    loggerUtil({ text: 'Error sending email', value: error })

    throw error
  }
}

export default sendEmail
