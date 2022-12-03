import React from 'react';
import { LoginProps } from './Login.types';

const Login: React.FunctionComponent<LoginProps> = ({ i18n, handleRegister }) => {
  if (!i18n?.loginBtn || !i18n.text || !i18n.welcome || !i18n.artistsCount || !i18n.releasesCount) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center lg:w-1/2">
      <h2 className="rr-text text-4xl mb-3">{i18n.welcome}</h2>
      <p className="rr-text text-xl mb-3">{i18n.text}</p>

      <button className="btn btn-large lg:ml-8 my-8 w-44 h-14" onClick={() => handleRegister()}>
        {i18n.loginBtn}
      </button>
    </div>
  );
};

export default Login;
