export interface IAuth {
  email: string;
  password: string;
  name: string;
  surname: string;
}

export interface IAuthResponse {
  token: string;
  user: {
    email: string;
    id: string;
    password: string;
    name: string;
    surname: string;
  };
}
