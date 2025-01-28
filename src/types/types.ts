export type createUserParams = {
  username: string;
  password: string;
};

export type updateUserParams = {
  username: string;
  authStrategy?: string;
};
