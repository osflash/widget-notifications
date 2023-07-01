interface IconProps {
  icon: React.ElementType
}

export const Icon: React.FC<IconProps> = ({ icon: Icon }) => {
  return <Icon className="mt-3 h-6 w-6 text-violet-500" />
}

Icon.displayName = 'Icon'
