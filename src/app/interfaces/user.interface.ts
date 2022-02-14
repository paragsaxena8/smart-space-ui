export interface UserData {
  _id: string;
  username: string;
  name: string;
  email: string;
  role: string;
  photo: string;
  createdAt: Date;
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
