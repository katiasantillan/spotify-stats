import '../styles/globals.css'
import TopProvider from '../store/store-context';

function MyApp({ Component, pageProps }) {
  return (
    <TopProvider>
      <Component {...pageProps} />
    </TopProvider>
  );
}

export default MyApp
