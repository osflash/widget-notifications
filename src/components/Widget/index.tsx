'use client'

import { BellRing, Link as LinkIcon, Check } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useLocalStorage } from 'react-use'
import { getDate } from '~/libs/utils'

import type { NotificationResponseSuccess } from '~/services/supabase'

interface WidgetProps {
  notifications: NotificationResponseSuccess
}

export const Widget: React.FC<WidgetProps> = ({ notifications }) => {
  const [notificationsState, setNotificationsState] = useState<string[]>([])

  const [storedNotifications, setStoredNotifications] = useLocalStorage<
    string[]
  >('notifications', [])

  useEffect(() => {
    if (storedNotifications) setNotificationsState(storedNotifications)
  }, [storedNotifications])

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
      <div className="flex items-center justify-between bg-zinc-800 px-6 py-4">
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
            {notifications
              ?.filter(({ id }) => !notificationsState.includes(id))
              .map(({ id, title, body, url, created_at }) => (
                <div
                  key={id}
                  className="flex items-start gap-6 bg-zinc-800 px-8 py-4"
                >
                  <BellRing className="mt-3 h-6 w-6 text-violet-500" />
                  <div className="flex flex-1 flex-col gap-2">
                    <p className="text-sm leading-relaxed text-zinc-100">
                      {body}
                    </p>
                    <div className="flex items-center gap-1 text-xss text-zinc-400">
                      <span className="font-semibold">{title}</span>
                      <div className="h-1 w-1 rounded-full bg-zinc-500 bg-center" />
                      <span title={getDate(created_at)}>
                        {getDate(created_at)}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 self-center">
                    <button
                      onClick={() => handleClick(id)}
                      className="flex h-8 w-8 items-center justify-center rounded bg-violet-500 hover:bg-violet-600"
                    >
                      <Check className="h-4 w-4 text-zinc-50" />
                    </button>
                    {url && (
                      <Link
                        className="flex h-8 w-8 items-center justify-center rounded bg-violet-500 hover:bg-violet-600"
                        href={url}
                        rel="noopener noreferrer"
                        target="_blank"
                        aria-label={url}
                        title={url}
                      >
                        <LinkIcon className="h-4 w-4 text-zinc-50" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Old Section */}
        <div>
          <div className="bg-zinc-900 px-5 py-2 text-sm text-zinc-400">
            Antigas
          </div>

          <div className="divide-y-2 divide-zinc-950">
            {notifications
              ?.filter(({ id }) => notificationsState.includes(id))
              .map(({ id, title, body, url, created_at }) => (
                <div
                  key={id}
                  className="flex items-start gap-6 bg-zinc-800 px-8 py-4"
                >
                  <BellRing className="mt-3 h-6 w-6 text-violet-500" />

                  <div className="flex flex-1 flex-col gap-2">
                    <p className="text-sm leading-relaxed text-zinc-400">
                      {body}
                    </p>
                    <div className="flex items-center gap-1 text-xss text-zinc-400">
                      <span>{title}</span>
                      <div className="h-1 w-1 rounded-full bg-zinc-500" />
                      <span title={getDate(created_at)}>
                        {getDate(created_at)}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 self-center">
                    {url && (
                      <Link
                        className="flex h-8 w-8 items-center justify-center rounded bg-violet-500 hover:bg-violet-600"
                        href={url}
                        rel="noopener noreferrer"
                        target="_blank"
                        aria-label={url}
                        title={url}
                      >
                        <LinkIcon className="h-4 w-4 text-zinc-50" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
