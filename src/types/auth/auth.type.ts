export type Auth = {
  email: string;
  password: string;
  role: string;
  access_token: string;
  refresh_token: string;
};

export type ConfirmResponse = {
  email: string;
  emailToken: string;
};
