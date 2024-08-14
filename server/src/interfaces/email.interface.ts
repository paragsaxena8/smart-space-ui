import { IUser } from "./user.interface";
import { Request } from "express";

export interface MailtrapTransporter {
  host: string;
}

export interface EmailOptions {
  user: IUser;
  subject: string;
  message: string;
}

