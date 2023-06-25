import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import webPush from 'web-push'
import { WebPushError } from 'web-push'
import { payloadSchema } from '~/libs/zod'
import { supabaseAdmin } from '~/services/supabaseAdmin'
import { v4 as uuid } from 'uuid'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY!
const privateKey = process.env.PRIVATE_KEY!

webPush.setVapidDetails(baseUrl, publicKey, privateKey)

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url)

  const secret = searchParams.get('secret')
  const title = searchParams.get('title') || ''
  const body = searchParams.get('body') || ''
  const url = searchParams.get('url')

  const isAdmin = process.env.SECRET! === secret

  if (!isAdmin) return NextResponse.json({ ok: false }, { status: 401 })

  const { data: subscriptions } = await supabaseAdmin
    .from('subscription')
    .select('*')

  if (!subscriptions) return NextResponse.json({ ok: false }, { status: 502 })

  const id = uuid()

  const payload = payloadSchema.parse({ body, data: { id, title, url } })

  await supabaseAdmin.from('notification').insert({ id, title, body, url })

  const notifications = subscriptions.map(
    async ({ id, endpoint, p256dh, auth }) => {
      try {
        const buffer = Buffer.from(JSON.stringify(payload))

        return await webPush.sendNotification(
          { endpoint, keys: { auth, p256dh } },
          buffer
        )
      } catch (err) {
        if (err instanceof WebPushError) {
          await supabaseAdmin.from('subscription').delete().eq('id', id)
        }
      }
    }
  )

  const data = await Promise.all(notifications)

  return new NextResponse(
    `${data.filter(Boolean).length} notificações enviadas de ${
      subscriptions.length
    }!`
  )
}
