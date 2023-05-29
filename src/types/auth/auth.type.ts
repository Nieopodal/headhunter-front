export type ConfirmResponse = {
  email: string;
  emailToken: string;
};

export type RecoveryPasswordResponse = {
  sentToEmail: string;
};
