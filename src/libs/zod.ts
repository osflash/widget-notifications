import { z } from 'zod'

export const subscriptionSchema = z.object({
  endpoint: z.string(),
  expirationTime: z.number().nullable(),
  keys: z.object({
    p256dh: z.string(),
    auth: z.string()
  })
})

export type SubscriptionSchema = z.infer<typeof subscriptionSchema>

export const payloadDataSchema = z.object({
  id: z.string().uuid(),
  title: z.string().nullable().optional(),
  url: z.string().url().nullable().optional()
})

export type PayloadDataSchema = z.infer<typeof payloadDataSchema>

export const payloadSchema = z.object({
  actions: z
    .object({
      action: z.string(),
      icon: z.string().optional(),
      title: z.string()
    })
    .array()
    .optional(),
  badge: z.string().optional(),
  body: z.string().optional(),
  data: payloadDataSchema.optional(),
  dir: z.enum(['auto', 'ltr', 'rtl']).optional(),
  icon: z.string().optional(),
  image: z.string().optional(),
  lang: z.string().optional(),
  renotify: z.boolean().optional(),
  requireInteraction: z.boolean().optional(),
  silent: z.boolean().optional(),
  tag: z.string().optional(),
  timestamp: z.number().optional(),
  vibrate: z.number().or(z.number().array()).optional()
})

export type PayloadSchema = z.infer<typeof payloadSchema>
