import { getNotifications } from '~/services/supabase'

import { Widget } from '~/components/Widget'

export const revalidate = 0

const Home = async () => {
  const { data } = await getNotifications()

  return (
    <main className="flex flex-col items-center justify-center gap-4 px-2">
      <Widget notifications={data} />
    </main>
  )
}

export default Home
