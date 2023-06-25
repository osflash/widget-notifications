'use client'

import { useSubscription } from '~/providers/SubscriptionProvider'

export const Header: React.FC = () => {
  const { error } = useSubscription()

  return (
    <header className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-2">
      <h1 className="text-3xl font-semibold">OsFlash</h1>
      {error && (
        <p className="text-sm leading-relaxed text-red-500">{error.message}</p>
      )}
    </header>
  )
}
