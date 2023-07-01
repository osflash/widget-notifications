interface ActionsProps {
  children: React.ReactNode
}

export const Actions: React.FC<ActionsProps> = ({ children }) => {
  return <div className="flex gap-2 self-center">{children}</div>
}

Actions.displayName = 'Actions'
