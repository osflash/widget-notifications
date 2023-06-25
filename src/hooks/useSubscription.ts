import { useAsync } from 'react-use'

export const useSubscription = () => {
  return useAsync(async () => {
    if (!('serviceWorker' in navigator)) {
      throw new Error('unsupported Service Worker')
    }

    if (!('PushManager' in window)) {
      throw new Error('unsupported Push Manager')
    }

    await navigator.serviceWorker.register('sw.js')

    const serviceWorker = await navigator.serviceWorker.ready

    let subscription = await serviceWorker.pushManager.getSubscription()

    if (!subscription) {
      subscription = await serviceWorker.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_PUBLIC_KEY
      })
    }

    return subscription
  })
}
