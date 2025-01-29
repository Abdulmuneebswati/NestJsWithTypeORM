export type createUserParams = {
  username: string;
  password: string;
};

export type updateUserParams = {
  username: string;
  authStrategy?: string;
};

export type CreateUserProfileParams = {
  firstName: string;
  lastName: string;
  age: number;
  dob: string;
};

export type CreateUserPostParams = {
  title: string;
  description: string;
};
