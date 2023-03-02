import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta
          name="description"
          content="Discover the latest fashion trends and shop your favorite clothing, shoes, accessories and more on Tealade, your ultimate ecommerce destination."
        />
        <meta
          name="keywords"
          content="Tealade, fashion, ecommerce, clothing, shoes, accessories"
        />
        <meta
          property="og:title"
          content="Tealade | Shop the Latest Fashion Trends Online"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.tealade.com/" />
        <meta
          property="og:image"
          content="https://www.tealade.com/tealade-logo.png"
        />
        <meta
          property="og:description"
          content="Discover the latest fashion trends and shop your favorite clothing, shoes, accessories and more on Tealade, your ultimate ecommerce destination."
        />
        <meta
          property="twitter:title"
          content="Tealade | Shop the Latest Fashion Trends Online"
        />
        <meta
          property="twitter:description"
          content="Discover the latest fashion trends and shop your favorite clothing, shoes, accessories and more on Tealade, your ultimate ecommerce destination."
        />
        <meta
          property="twitter:image"
          content="https://www.tealade.com/tealade-logo.png"
        />
        <meta name="robots" content="index,follow" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
