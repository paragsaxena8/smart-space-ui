export interface UserData {
  _id: string;
  username: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  passwordResetExpires: Date;
  passwordResetToken: string;
  bio: string;
}

export interface Data {
  user: UserData;
}

export interface User {
  status: string;
  token: string;
  data: Data;
}

export interface Error {
  status: string;
  message: string;
}
