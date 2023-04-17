import OrdersList from '@/components/Orderslist/Orderslist'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Via Leões</title>
        <meta name="description" content="Acesso Via Leões" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <OrdersList></OrdersList>

    </>
  )
}
