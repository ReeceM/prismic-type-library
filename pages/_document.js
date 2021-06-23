import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          {/* <!-- Primary Meta Tags --> */}
          <meta name="title" content="(Unofficial) Prismic Type Library" />
          <meta name="description "
            content="A web interface to access a collection of different Prisimic custom doc types that can be used in your project." />

          {/* <!-- Open Graph / Facebook --> */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://prismic-type-library.vercel.app/" />
          <meta property="og:title" content="(Unofficial) Prismic Type Library" />
          <meta property="og:description"
            content="A web interface to access a collection of different Prisimic custom doc types that can be used in your project." />
          <meta property="og:image" content="https://prismic-type-library.vercel.app/social.png" />
          <meta property="og:author" content="@iexistin3d" />

          {/* <!-- Twitter --> */}
          <meta property="twitter:url" content="https://prismic-type-library.vercel.app/" />
          <meta property="twitter:title" content="(Unofficial) Prismic Type Library" />
          <meta property="twitter:description"
            content="A web interface to access a collection of different Prisimic custom doc types that can be used in your project." />
          <meta property="twitter:image" content="https://prismic-type-library.vercel.app/social.png" />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:author" content="@iexistin3d" />

          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
