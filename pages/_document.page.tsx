import Document, { Html, Head, Main, NextScript } from 'next/document';
import Meta from '../components/Meta/Meta';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body className="bg-white dark:bg-zinc-900">
          <Meta />
          <script src="/noflash.js" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
