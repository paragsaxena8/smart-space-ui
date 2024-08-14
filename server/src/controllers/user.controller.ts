import { User } from "../models/user.model";
import {
  checkOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handle.factory";

export const getAllUser = getAll(User);
export const getUser = getOne(User);
export const updateUser = updateOne(User);
export const deleteUser = deleteOne(User);
export const checkUsername = checkOne(User, "username");
