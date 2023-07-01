interface ContentProps {
  title: string
  text: string
  date: string
}

export const Content: React.FC<ContentProps> = ({ title, text, date }) => {
  const time = new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  })

  return (
    <div className="flex flex-1 flex-col gap-2">
      <p className="text-sm leading-relaxed text-zinc-100">{text}</p>
      <div className="flex flex-col gap-1 text-xss text-zinc-400 sm:flex-row sm:items-center">
        <span className="truncate font-semibold" title={title}>
          {title}
        </span>
        <div className="h-1 w-1 truncate rounded-full bg-zinc-500 bg-center max-sm:hidden" />
        <span title={time}>{time}</span>
      </div>
    </div>
  )
}

Content.displayName = 'Content'
