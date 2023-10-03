export interface ILoginResponse {
  email: string;
  lastName: string;
  firstName: string;
}

export interface IDataUser {
  email: string;
  password: string;
  lastName: string;
  firstName: string;
}

export interface IRegistrationType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ISigninType {
  email: string;
  password: string;
}

export interface IDataInfo {
  firstName: string;
  lastName: string;
}

export interface IRepository {
  id: number;
  full_name: string;
  html_url: string;
  description: string;
  owner: {
    avatar_url: string;
  };
}
