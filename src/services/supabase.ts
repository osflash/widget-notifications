import { createClient } from '@supabase/supabase-js'

import { Database } from '~/types/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false
  }
})

export const getNotifications = async () => {
  return await supabase
    .from('notification')
    .select()
    .order('created_at', { ascending: false })
    .limit(10)
}

type NotificationResponse = Awaited<ReturnType<typeof getNotifications>>
export type NotificationResponseSuccess = NotificationResponse['data']
export type NotificationResponseError = NotificationResponse['error']
