import { NextRequest, NextResponse } from 'next/server'

import { mixpanelServer } from '@/pkg/integrations/mixpanel'
import { loggerUtil } from '@/pkg/utils/logger'

export async function POST(request: NextRequest) {
  try {
    const { events } = await request.json()

    if (!Array.isArray(events) || events.length === 0) {
      return NextResponse.json({ error: 'Invalid events payload' }, { status: 400 })
    }

    mixpanelServer.trackBatch(events)

    return NextResponse.json({
      message: 'Events tracked successfully',
      count: events.length,
    })
  } catch (error) {
    loggerUtil({
      text: 'Error tracking events',
      value: error,
      level: 'error',
      isActiveOnProd: true,
    })
    return NextResponse.json({ error: 'Failed to track events' }, { status: 500 })
  }
}
