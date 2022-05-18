import React from 'react';
import { LoginProps } from './Login.types';

const Login: React.FunctionComponent<LoginProps> = ({ i18n, handleRegister, counters }) => {
  if (
    !i18n?.loginBtn ||
    !i18n.text ||
    !i18n.welcome ||
    !i18n.artistsCount ||
    !i18n.releasesCount ||
    !counters.artistsCounter ||
    !counters.releasesCounter
  ) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center lg:w-1/2">
      <h2 className="dark:text-slate-300 text-4xl mb-3">{i18n.welcome}</h2>
      <p className="dark:text-slate-300 text-xl mb-3">{i18n.text}</p>

      <button className="btn btn-large lg:ml-8 my-8 w-44 h-14" onClick={() => handleRegister()}>
        {i18n.loginBtn}
      </button>

      <div className="flex justify-between w-full px-16 mt-16">
        <div className="text-center">
          <p className="dark:text-slate-300">{i18n.artistsCount}</p>
          <p className="dark:text-slate-300">{counters.artistsCounter}</p>
        </div>
        <div className="text-center">
          <p className="dark:text-slate-300">{i18n.releasesCount}</p>
          <p className="dark:text-slate-300">{counters.releasesCounter}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
