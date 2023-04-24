import OrdersList from '@/components/Orderslist/Orderslist'
import Head from 'next/head'


export default function OrdersPage() {

  return (
    <>
      <Head>
        <title>Via Leões</title>
        <meta name="description" content="Lista de Pedidos Viã Leões" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <OrdersList></OrdersList>

    </>
  )
}
