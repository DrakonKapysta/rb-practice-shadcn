import { Level, type Logger, pino } from 'pino'

interface IDebugUtil {
  text: string
  value: unknown
  isActiveOnProd?: boolean
  level?: Level
}

export const loggerUtil = (props: IDebugUtil) => {
  const { text, value, isActiveOnProd = false, level = 'info' } = props

  const logger: Logger = pino({
    transport: {
      target: 'pino-pretty',
      options: { colorize: true },
      level,
    },
    timestamp: pino.stdTimeFunctions.epochTime,
    enabled: process.env.NODE_ENV !== 'production' || isActiveOnProd,
    redact: [],
  })

  logger.info(`[${text}]: ${JSON.stringify(value, null, 2)}`)
}
