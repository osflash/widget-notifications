'use client'

import { SubscriptionProvider } from '~/providers/SubscriptionProvider'

interface ProvidersProps {
  children: React.ReactNode
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <>
      <SubscriptionProvider>
        <>{children}</>
      </SubscriptionProvider>
    </>
  )
}
