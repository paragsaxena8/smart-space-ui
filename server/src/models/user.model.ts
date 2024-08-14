import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";
import { compare, hash } from "bcryptjs";
import { createHash, randomBytes } from "crypto";
import validator from "validator";

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    minlength: [3, "Username must be at least 3 characters"],
    maxlength: [20, "Username must be at most 20 characters"],
    unique: true,
    match: /^[a-zA-Z0-9]+$/,
    validate: [
      validator.isAlphanumeric,
      "Username can only contain letters and numbers",
    ],
  },
  name: {
    type: String,
    required: [true, "Please add a name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    trim: true,
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el: any) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  photo: {
    type: String,
    default: "./assets/images/default.png",
  },
  active: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  bio: {
    type: String,
    trim: true,
    default: "",
    maxlength: [200, "Bio must be at most 200 characters"],
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  activationToken: String,
}, { strictQuery: true});

userSchema.pre<IUser>("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre<IUser>("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now();
  next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await compare(candidatePassword, userPassword);
};

userSchema.methods.checkPasswordChange = function (
  this: IUser,
  JWTTimestamp: number
) {
  if (this.passwordChangedAt) {
    const changedTimestamp = Math.floor(
      this.passwordChangedAt.getTime() / 1000
    );
    console.log(JWTTimestamp < changedTimestamp);

    return JWTTimestamp < changedTimestamp;
  }
  // False means NOT changed
  return false;
};

userSchema.methods.createResetPasswordToken = function () {
  const resetToken = randomBytes(32).toString("hex");

  this.passwordResetToken = createHash("sha256")
    .update(resetToken)
    .digest("hex");
  // console.log({ resetToken }, this.passwordResetToken);
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

userSchema.methods.createActivationToken = function () {
  const activationToken = randomBytes(8).toString("hex");

  this.activationToken = createHash("sha256")
    .update(activationToken)
    .digest("hex");

  return activationToken;
};

export const User = model<IUser>("User", userSchema);
