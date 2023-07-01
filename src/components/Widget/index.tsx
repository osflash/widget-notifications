'use client'

import { useEffect, useState } from 'react'
import { useLocalStorage } from 'react-use'

import Link from 'next/link'

import { BellRing, Link as LinkIcon, Check } from 'lucide-react'

import type { NotificationResponseSuccess } from '~/services/supabase'

import { Notification } from '~/components/Notification'

interface WidgetProps {
  notifications: NotificationResponseSuccess
}

type FilteredNotifications = {
  newNotifications: NotificationResponseSuccess
  oldNotifications: NotificationResponseSuccess
}

export const Widget: React.FC<WidgetProps> = ({ notifications }) => {
  const [{ newNotifications, oldNotifications }, setFilteredNotifications] =
    useState<FilteredNotifications>({
      newNotifications: [],
      oldNotifications: []
    })

  const [storedNotifications, setStoredNotifications] = useLocalStorage<
    string[]
  >('notifications', [])

  useEffect(() => {
    if (!notifications) return

    const newNotifications = notifications.filter(
      ({ id }) => !storedNotifications?.includes(id)
    )

    const oldNotifications = notifications.filter(({ id }) =>
      storedNotifications?.includes(id)
    )

    setFilteredNotifications({ newNotifications, oldNotifications })
  }, [notifications, storedNotifications])

  const handleClickReadAll = () => {
    if (notifications) {
      setStoredNotifications(notifications.map(({ id }) => id))
    }
  }

  const handleClick = (id: string) => {
    if (!storedNotifications) return setStoredNotifications([id])

    setStoredNotifications([...storedNotifications, id])
  }

  return (
    <div className="w-full max-w-md overflow-hidden rounded">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 bg-zinc-800 px-6 py-4">
        <span className="font-bold">Notificações</span>
        <button
          onClick={handleClickReadAll}
          className="text-xs font-bold text-violet-500 hover:text-violet-400"
        >
          MARCAR TODAS COMO VISTAS
        </button>
      </div>

      <div className="divide-y-2 divide-zinc-700">
        {/* Recent Section */}
        <div>
          <div className="bg-zinc-900 px-5 py-2 text-sm text-zinc-400">
            Recentes
          </div>

          <div className="divide-y-2 divide-zinc-950">
            {newNotifications?.map(({ id, title, body, url, created_at }) => (
              <Notification.Root key={id}>
                <Notification.Icon icon={BellRing} />
                <Notification.Content
                  title={title}
                  text={body}
                  date={created_at}
                />
                <Notification.Actions>
                  <Notification.Action
                    icon={Check}
                    onClick={() => handleClick(id)}
                  />
                  {url && (
                    <Link
                      href={url}
                      rel="noopener noreferrer"
                      target="_blank"
                      aria-label={url}
                      title={url}
                    >
                      <Notification.Action icon={LinkIcon} />
                    </Link>
                  )}
                </Notification.Actions>
              </Notification.Root>
            ))}
          </div>
        </div>

        {/* Old Section */}
        <div>
          <div className="bg-zinc-900 px-5 py-2 text-sm text-zinc-400">
            Antigas
          </div>

          <div className="divide-y-2 divide-zinc-950">
            {oldNotifications?.map(({ id, title, body, url, created_at }) => (
              <Notification.Root key={id}>
                <Notification.Icon icon={BellRing} />
                <Notification.Content
                  title={title}
                  text={body}
                  date={created_at}
                />
                <Notification.Actions>
                  {url && (
                    <Link
                      href={url}
                      rel="noopener noreferrer"
                      target="_blank"
                      aria-label={url}
                      title={url}
                    >
                      <Notification.Action icon={LinkIcon} />
                    </Link>
                  )}
                </Notification.Actions>
              </Notification.Root>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
