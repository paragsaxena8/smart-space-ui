import { CookieOptions, NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { User } from "../models/user.model";
import { sign, verify } from "jsonwebtoken";
import { AppError } from "../utils/appError";
import { IUser, RequestObj } from "../interfaces/user.interface";
import { sendEmail } from "../utils/email";
import { createHash } from "crypto";
const signToken = (id: any) =>
  sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user: any, statusCode: number, res: Response) => {
  try {
    const token = signToken(user._id);
    const cookieOptions: CookieOptions = {
      expires: new Date(
        Date.now() +
          parseInt(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

    res.cookie("jwt", token, cookieOptions);

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    return new AppError("Error while creating token.", 500);
  }
};

export const protect = catchAsync(
  async (req: RequestObj, res: Response, next: NextFunction) => {
    // 1) Getting token and check of it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    } else {
      console.log("No token found");
    }

    if (!token) {
      return next(
        new AppError(
          "You are not logged  in! Please log in to get access.",
          401
        )
      );
    }

    verifyAfterLoggIn(req, res, next, token);
  }
);

const verifyAfterLoggIn = async (
  req: RequestObj,
  res: Response,
  next: NextFunction,
  token: string
) => {
  // 2) Verification token
  const decoded: any = verify(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.checkPasswordChange(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
};

export const restrictTo =
  (...roles: string[]) =>
  (req: RequestObj, res: Response, next: NextFunction) => {
    const role = req.user.role;
    if (!roles.includes(role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    next();
  };

export const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, passwordConfirm, username, bio, photo } =
      req.body;

    if (!name || !email || !password || !passwordConfirm || !username) {
      return next(new AppError("Please fill all the fields", 400));
    }

    if (password !== passwordConfirm) {
      return next(new AppError("Passwords do not match", 400));
    }

    const usermail = await User.findOne({ email });
    if (usermail) {
      return next(new AppError("Email already exists", 400));
    }

    const user_username = await User.findOne({ username });
    if (user_username || username === "admin") {
      return next(new AppError("Username already exists", 400));
    }

    const newUser = await User.create({
      name,
      email,
      password,
      passwordConfirm,
      username,
      bio,
      photo,
    });

    // create activation token
    const activationToken = newUser.createActivationToken();
    await newUser.save({ validateBeforeSave: false });

    const activeURL = `${process.env.clientURL}/verify/${activationToken}`;

    // Send Welcome Email
    sendEmailPrep(
      newUser,
      {
        subject: "Welcome to Smart Space App",
        message: `Welcome to <strong>Smart Space</strong> &#8211; we're excited to have you on board and we'd love to say thank you on behalf of our whole team for chosing us. We believe our Smart Space will help you to start with new blog post.
        <br><br>
         To Activate You Account, Click on the below Button \n
          <button>
          <a href="${activeURL}">Verify My Account</a>
          </button>
         \n
        [OR] \n
        Paste the following link in the browser :
        <code>${activeURL}</code>
        `,
        type: "verifyAccount",
      },
      res,
      next
    );
  }
);

export const isLoggedIn = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;
    if (!token) {
      return next();
    }
    const decoded: any = verify(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);
    if (!currentUser.active) {
      return next(
        new AppError("User is not activated, Please Confirm your Account", 401)
      );
    }

    verifyAfterLoggIn(req, res, next, token);
  }
);

const sendEmailPrep = async (
  user: IUser,
  emailVar: { subject: string; message: string; type: string },
  res: Response,
  next: NextFunction
) => {
  try {
    const { subject, message, type } = emailVar;
    const emailOptions = {
      user,
      subject,
      message,
    };
    await sendEmail(emailOptions);
    if (type === "verifyAccount") {
      user.password = undefined;
      user.activationToken = undefined;
      res.status(200).json({
        status: "success",
        message: "Signup Successfully, Token sent to email!",
        data: {
          user,
        },
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "Reset Token sent to your email successfully!",
      });
    }
  } catch (err) {
    if (emailVar.type === "resetPassword") {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
    } else if (emailVar.type === "verifyAccount") {
      user.activationToken = undefined;
    }

    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        "There was an error sending the email. Try again later!",
        500
      )
    );
  }
};

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return next(new AppError("Please fill all the fields", 400));
    }

    const user = await User.findOne({ username }).select("+password");

    if (!user || !(await user.comparePassword(password, user.password))) {
      return next(new AppError("Incorrect username or password", 401));
    }

    createSendToken(user, 200, res);
  }
);

export const forgotPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1) Get user based on POSTed email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new AppError("There is no user with email address.", 404));
    }

    // 2) Generate the random reset token
    const resetToken = user.createResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    // 3) Send it to user's email
    const resetURL = `${process.env.clientURL}/resetPassword/${resetToken}`;

    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: <br />
      <a href="${resetURL}"><button>Reset Password</button></a>. <br />
      or copy and paste this link in your browser: \n ${resetURL} <br />
      If you didn't forget your password, please ignore this email.`;

    sendEmailPrep(
      user,
      { subject: "Reset your password", message, type: "resetPassword" },
      res,
      next
    );
  }
);

export const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1) Get user based on the token
    const hashedToken = createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    // 2) If token has not expired, and there is user, set the new password
    if (!user) {
      return next(new AppError("Token is invalid or has expired", 400));
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    // 3) Update changedPasswordAt property for the user

    // 4) Log the user in, send JWT
    createSendToken(user, 200, res);
  }
);

export const updatePassword = catchAsync(
  async (req: RequestObj, res: Response, next: NextFunction) => {
    // 1) Get user from collection
    const user = await User.findById(req.user.id).select("+password");

    // 2) Check if POSTed current password is correct
    if (
      !(await user.comparePassword(req.body.passwordCurrent, user.password))
    ) {
      return next(new AppError("Your current password is wrong.", 401));
    }

    // 3) If so, update password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();
    // User.findByIdAndUpdate will NOT work as intended!

    // 4) Log user in, send JWT
    createSendToken(user, 200, res);
  }
);

export const activate = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const activationToken = createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user: IUser = await User.findOne({ activationToken });

    // 2) If token has not expired, and there is user, set the new password
    if (!user) {
      return next(new AppError("Token is invalid or has expired", 400));
    }
    user.active = true;
    user.activationToken = undefined;
    await user.save();

    // 4) Log the user in, send JWT
    createSendToken(user, 200, res);
  }
);
