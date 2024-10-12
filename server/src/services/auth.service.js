import { JWT_REFRESH_SECRET, JWT_SECRET } from '../constants/env.js';
import { CustomError } from '../helpers/customError.js';
import SessionModel from '../models/session.model.js';
import UserModel from '../models/user.model.js';
import VerificationCodeModel from '../models/verificationCode.model.js';
import { threeDaysFromNow } from '../utils/date.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const createAccount = async (data) => {
  // verify existing user
  const user = await UserModel.findOne({
    where: {
      email: data.email,
    },
  });
  if (user) {
    throw new CustomError('Email already registered', 409);
  }

  // encrypt password and send it to the DB
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // create user
  const newUser = await UserModel.create({
    email: data.email,
    password: hashedPassword,
  });

  // create verification code
  const verificationCode = await VerificationCodeModel.create({
    userId: newUser.id,
    type: 'email-verification',
    expiresAt: threeDaysFromNow(),
  });
  // send verification email - TODO

  // create session
  const session = await SessionModel.create({
    userId: newUser.id,
    userAgent: data.userAgent,
  });
  // sign access token & refresh token
  const refreshToken = jwt.sign(
    {
      sessionId: session.id,
    },
    JWT_REFRESH_SECRET,
    {
      expiresIn: '30d',
    }
  );

  const accessToken = jwt.sign(
    {
      userId: newUser.id,
      sessionId: session.id,
    },
    JWT_SECRET,
    {
      expiresIn: '15m',
    }
  );
  // return user & tokens

  return {
    user: {
      id: newUser.id,
      email: newUser.email,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    },
    accessToken,
    refreshToken,
  };
};
