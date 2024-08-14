import { Router } from "express";
import {
  restrictTo,
  protect,
  forgotPassword,
  isLoggedIn,
  login,
  resetPassword,
  signup,
  updatePassword,
  activate,
} from "../controllers/auth.controller";
import {
  getUser,
  getAllUser,
  updateUser,
  deleteUser,
  checkUsername,
} from "../controllers/user.controller";
export const userRoute = Router();

userRoute.route("/").get(protect, restrictTo("admin"), getAllUser);
userRoute
  .route("/:id")
  .get(getUser)
  .patch(protect, restrictTo("user", "admin"), updateUser)
  .delete(protect, restrictTo("admin"), deleteUser);
userRoute.post("/checkusername", checkUsername);

userRoute.post("/signup", signup);
userRoute.route("/login").post(isLoggedIn, login);

userRoute.post("/forgotPassword", forgotPassword);
userRoute.patch("/resetPassword/:token", resetPassword);
userRoute.get("/activate/:token", activate);
userRoute.post("/updatePassword", protect, restrictTo("user"), updatePassword);
