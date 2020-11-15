import Head from 'next/head';
import BackgroundLayout from '../layouts/BackgroundLayout';

export default function Home() {
  return (
    <>
      <Head>
        <title>Idomeneo</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      
      <BackgroundLayout>
        <div className="home-page">
          <section className="h-screen flex items-end">
            <h1 className="text-lg my-4 leading-10">ropera aan de maas presenteerd</h1>
          </section>
        </div>
      </BackgroundLayout>
    </>
  )
}
