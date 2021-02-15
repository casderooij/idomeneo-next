import Head from 'next/head';
import BackgroundLayout from '../layouts/BackgroundLayout';
import Div100vh from 'react-div-100vh';

export default function Home() {
  return (
    <>
      <Head>
        <title>Idomeneo</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#000000" />

        <link rel="manifest" href="/manifest.json" />
      </Head>

      <BackgroundLayout>
        <div className="home-page">
          <Div100vh className="flex items-end">
            <h1 className="mb-4 text-lg">
              <span className="block text-outline">
                ropera
                <br />
                aan de maas
                <br />
                presenteert
              </span>
              idomeneo
            </h1>
          </Div100vh>
        </div>
      </BackgroundLayout>
    </>
  );
}
