import type { NextPage } from 'next';
import Footer from '../components/Footer/Footer';
import Main from '../components/Main/Main';
import Header from '../components/Header/Header';

const Home: NextPage = () => {
  return (
    <div className="container max-auto">
      <div className="sm:border-x-2 rr-border flex flex-col h-screen">
        <Header />

        <Main />

        <Footer />
      </div>
    </div>
  );
};

export default Home;
