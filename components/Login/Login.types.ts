type LoginI18n = {
  welcome: string;
  loginBtn: string;
  text: string;
};

export interface LoginProps {
  i18n: LoginI18n;
  handleRegister: Function;
}