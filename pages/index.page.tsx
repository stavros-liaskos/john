import type { NextPage } from 'next';
import Footer from '../components/Footer/Footer';
import Main from '../components/Main/Main';
import Meta from '../components/Meta/Meta';

const Home: NextPage = () => {
  return (
    <div className="container max-auto">
      <Meta />
      <div className="border-2 dark:border-slate-800 border-black">
        <Main className={'mb-auto min-h-[calc(100vh_-_6rem)]'} i18n={{ todo: 'toso' }} />

        <Footer className="h-24" i18n={{ powered: 'Powered by  ' }} />
      </div>
    </div>
  );
};

export default Home;
