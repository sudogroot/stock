import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import 'antd/dist/antd.compact.css';
import { Layout } from '../components/layout';
function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Stock demo</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default CustomApp;
