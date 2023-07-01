import { forwardRef } from 'react'

import { Slot } from '@radix-ui/react-slot'

import { cx } from '~/libs/utils'

interface ActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ElementType
  asChild?: boolean
}

export const Action = forwardRef<HTMLButtonElement, ActionProps>(
  ({ icon: Icon, asChild, ...rest }, ref) => {
    const Component = asChild ? Slot : 'button'

    return (
      <Component
        className={cx(
          'flex h-8 w-8 items-center justify-center rounded bg-violet-500 hover:bg-violet-600',
          rest.className
        )}
        ref={ref}
        {...rest}
      >
        <Icon className="h-4 w-4 text-zinc-50" />
      </Component>
    )
  }
)

Action.displayName = 'Action'
