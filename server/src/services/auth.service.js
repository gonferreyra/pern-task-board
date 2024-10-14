import { JWT_REFRESH_SECRET, JWT_SECRET } from '../constants/env.js';
import { CustomError } from '../helpers/customError.js';
import SessionModel from '../models/session.model.js';
import UserModel from '../models/user.model.js';
import VerificationCodeModel from '../models/verificationCode.model.js';
import { threeDaysFromNow } from '../utils/date.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { verifyToken } from '../utils/jwt.js';

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
      audience: ['user'],
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
      audience: ['user'],
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

export const login = async ({ email, password, userAgent }) => {
  // get user by email
  const user = await UserModel.findOne({
    where: {
      email,
    },
  });
  if (!user) {
    throw new CustomError('Invalid email', 404);
  }

  // validate password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new CustomError('Invalid password', 401);
  }

  // create a session
  const session = await SessionModel.create({
    userId: user.id,
    userAgent,
  });

  // sign access token & refresh token
  const refreshToken = jwt.sign({ sessionId: session.id }, JWT_REFRESH_SECRET, {
    audience: ['user'],
    expiresIn: '30d',
  });

  const userId = user.id;
  const accessToken = jwt.sign({ sessionId: session.id, userId }, JWT_SECRET, {
    audience: ['user'],
    expiresIn: '15m',
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
    accessToken,
    refreshToken,
  };
};

export const refreshUserAccessToken = async (refreshToken) => {
  // verify token
  const payload = verifyToken(refreshToken);
  console.log(payload.sessionId);

  if (!payload) {
    throw new CustomError('Invalid refresh token', 401);
  }

  // validate session
  const session = await SessionModel.findByPk(payload.sessionId);
  if (!session && session.expiresAt > Date.now()) {
    throw new CustomError('Session expired', 401);
  }

  const newRefreshToken = jwt.sign(
    {
      sessionId: session.id,
    },
    JWT_REFRESH_SECRET,
    {
      audience: ['user'],
      expiresIn: '30d',
    }
  );

  const accessToken = jwt.sign(
    {
      userId: session.userId,
      sessionId: session.id,
    },
    JWT_SECRET,
    {
      audience: ['user'],
      expiresIn: '15m',
    }
  );

  return {
    accessToken,
    newRefreshToken,
  };
};
