import React from 'react';
// import { useUser } from '@auth0/nextjs-auth0/client';
import Login from '../components/Login/Login';
import { loginI18n } from '../i18n';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const Main: React.FunctionComponent = () => {
  // const { user } = useUser();

  return (
    <div className="container max-auto">
      <div className="sm:border-x-2 rr-border flex flex-col h-screen">
        <Header />
        <main className="rr-column flex-auto">
          <div className="flex flex-col flex-auto w-full lg:w-9/12">
            {false ? (
              <>
                <h1 className="rr-text">why are we logged here?</h1>
              </>
            ) : (
              <Login i18n={loginI18n} />
            )}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};
Main.whyDidYouRender = false;
export default Main;
