'use client'

import { createContext, useContext } from 'react'
import { useAsync } from 'react-use'
import { supabase } from '~/services/supabase'
import { v4 as uuid } from 'uuid'
import { subscriptionSchema } from '~/libs/zod'

interface SubscriptionProviderProps {
  children: React.ReactNode
}

interface SubscriptionContextProps {
  subscription?: PushSubscription
  error?: Error
}

export const SubscriptionContext = createContext<
  SubscriptionContextProps | undefined
>(undefined)

export const SubscriptionProvider: React.FC<
  SubscriptionProviderProps
> = rest => {
  const { value: subscription, error } = useAsync(async () => {
    if (!('serviceWorker' in navigator)) {
      throw new Error(
        'Desculpe, mas seu navegador não oferece suporte ao Service Worker.'
      )
    }

    const serviceWorker = await navigator.serviceWorker.register('sw.js')

    if (!('PushManager' in window)) {
      throw new Error(
        'Desculpe, mas seu dispositivo ou navegador não oferece suporte completo à API de notificação push da web.'
      )
    }

    let subscription = await serviceWorker.pushManager.getSubscription()

    if (!subscription) {
      try {
        subscription = await serviceWorker.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: process.env.NEXT_PUBLIC_PUBLIC_KEY
        })

        const {
          endpoint,
          keys: { p256dh, auth }
        } = subscriptionSchema.parse(subscription.toJSON())

        await supabase
          .from('subscription')
          .insert({ id: uuid(), endpoint, p256dh, auth })
      } catch (err) {
        throw new Error(
          'Habilite as notificações para receber atualizações em tempo real e não perder nenhuma informação importante.'
        )
      }
    }

    return subscription
  }, [])

  return (
    <SubscriptionContext.Provider value={{ subscription, error }} {...rest} />
  )
}

export const useSubscription = () => {
  const context = useContext(SubscriptionContext)

  if (context === undefined) {
    throw new Error(
      'useSubscription must be used within a SubscriptionProvider.'
    )
  }

  return context
}
