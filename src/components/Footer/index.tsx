import Link from 'next/link'

export const Footer: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <p>
        Feito com ❤️ por{' '}
        <Link
          className="font-bold hover:text-yellow-500"
          href="https://osflash.vercel.app/"
          rel="noopener noreferrer"
          target="_blank"
          aria-label="Site pessoal"
          title="Site pessoal"
        >
          OsFlash ⚡
        </Link>
      </p>
      <Link
        className="font-medium hover:text-yellow-500"
        href="https://www.buymeacoffee.com/osflash"
        rel="noopener noreferrer"
        target="_blank"
        aria-label="Buy Me A Coffee"
        title="Buy Me A Coffee"
      >
        Buy Me A Coffee
      </Link>
    </div>
  )
}
