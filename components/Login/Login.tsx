import React from 'react';
import { LoginProps } from './Login.types';

const Login: React.FunctionComponent<LoginProps> = ({ i18n, handleRegister }) => {
  if (!i18n?.loginBtn || !i18n.text || !i18n.welcome) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-96 p-3">
      <h2 className="dark:text-slate-400 text-4xl mb-3">{i18n.welcome}</h2>
      <p className="dark:text-slate-400 text-xl mb-3">{i18n.text}</p>

      <button className="btn btn-large lg:ml-8 mx-3 my-2 w-44 h-14 mb-3" onClick={() => handleRegister()}>
        {i18n.loginBtn}
      </button>
    </div>
  );
};

export default Login;
