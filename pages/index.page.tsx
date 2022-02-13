import type { NextPage } from 'next';
import Footer from '../components/Footer/Footer';
import Main from '../components/Main/Main';
import Meta from '../components/Meta/Meta';

const Home: NextPage = () => {
  return (
    <div className="container max-auto">
      <Meta />
      <div className="flex flex-col h-screen justify-between">
        <Main className={'mb-auto'} i18n={{ todo: 'toso' }} />

        <Footer className="h-10" i18n={{ powered: 'Powered by  ' }} />
      </div>
    </div>
  );
};

export default Home;
