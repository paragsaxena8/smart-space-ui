import { Document } from "mongoose";
import { Request } from "express";
export interface IUser extends Document {
  username:string;
  email: string;
  password: string;
  name: string;
  bio: string;
  passwordConfirm: string;
  createdAt: Date;
  photo: string;
  active: boolean;
  role: string;
  passwordChangedAt: any;
  passwordResetToken: string;
  passwordResetExpires: Date;
  activationToken: string;
  comparePassword:any;
  checkPasswordChange:any;
  createActivationToken:any;
  createResetPasswordToken:any;
}

export interface IUserBlog extends Document {
  title: string;
  body: string;
  category: string[];
  featuredImage: string;
  author: string;
  slug: string;
  summary: string;
  readingTime: number;
}

export interface IUserCategory extends Document {
  name: string;
  slug: string;
  description: string;
}

export interface RequestObj extends Request {
  user?: IUser;
  featuredImage?: string;
}