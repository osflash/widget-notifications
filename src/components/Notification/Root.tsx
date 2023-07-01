interface RootProps {
  children: React.ReactNode
}

export const Root: React.FC<RootProps> = ({ children }) => {
  return (
    <div className="flex items-start gap-6 bg-zinc-800 px-8 py-4">
      {children}
    </div>
  )
}

Root.displayName = 'Root'
