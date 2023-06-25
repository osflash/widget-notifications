/**
 * @type {ServiceWorkerGlobalScope}
 */
const sw = self

sw.addEventListener('push', async event => {
  /**
   * @type {NotificationOptions}}
   */
  const options = event.data?.json()

  /**
   * @type {PayloadDataSchema}
   */
  const data = options.data

  if (!data?.title) {
    return console.error('Title not found')
  }

  const notification = sw.registration.showNotification(data.title, options)

  event.waitUntil(notification)
})

sw.addEventListener('notificationclick', event => {
  const { notification } = event

  notification.close()

  const handleClick = async () => {
    /**
     * @type {PayloadDataInput}
     */
    const data = notification.data

    if (!data?.url) {
      return
    }

    clients.openWindow(new URL(data.url))
  }

  event.waitUntil(handleClick())
})

sw.addEventListener('install', () => {
  sw.skipWaiting()
})

sw.addEventListener('activate', event => {
  event.waitUntil(clients.claim())
})
