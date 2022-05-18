import type { NextPage } from 'next';
import Footer from '../components/Footer/Footer';
import Main from '../components/Main/Main';
import Header from '../components/Header/Header';

const Home: NextPage = () => {
  return (
    <div className="container max-auto">
      <div className="sm:border-x-2 dark:border-slate-600 border-black">
        <Header />

        <Main className={''} i18n={{ todo: 'toso' }} />

        <Footer className="h-20" i18n={{ powered: 'Powered by  ' }} />
      </div>
    </div>
  );
};

export default Home;
