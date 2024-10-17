import {
  APP_ORIGIN,
  JWT_REFRESH_SECRET,
  JWT_SECRET,
} from '../constants/env.js';
import { CustomError } from '../helpers/customError.js';
import SessionModel from '../models/session.model.js';
import UserModel from '../models/user.model.js';
import VerificationCodeModel from '../models/verificationCode.model.js';
import { threeDaysFromNow } from '../utils/date.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { verifyToken } from '../utils/jwt.js';
import { Sequelize } from 'sequelize';
import { sendMail } from '../utils/send-mail.js';
import {
  getPasswordResetTemplate,
  getVerifyEmailTemplate,
} from '../utils/email-templates.js';

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

  // send verification email
  const url = `${APP_ORIGIN}/email/verify/${verificationCode.id}`;

  await sendMail({
    to: newUser.email,
    ...getVerifyEmailTemplate(url),
  });

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
  const { payload } = verifyToken(refreshToken, 'refreshToken');

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

export const verifyEmail = async (code) => {
  // get verification code
  const verificationCode = await VerificationCodeModel.findOne({
    where: {
      id: code,
      type: 'email-verification',
      expiresAt: {
        // grater or equal to current time
        [Sequelize.Op.gte]: Date.now(),
      },
    },
  });
  if (!verificationCode) {
    throw new CustomError('Invalid or expired verification code', 404);
  }

  // update user
  const updatedUser = await UserModel.update(
    {
      verified: true,
    },
    {
      where: {
        id: verificationCode.userId,
      },
    }
  );

  if (!updatedUser) {
    throw new CustomError('Failed to verify email', 500);
  }

  // delete verification code
  await verificationCode.destroy();

  // return user
  return {
    user: {
      id: updatedUser.userId,
      email: updatedUser.email,
      verified: updatedUser.verified,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    },
  };
};

export const sendPasswordResetEmail = async (email) => {
  // get user by email
  const user = await UserModel.findOne({
    where: {
      email,
    },
  });
  if (!user) {
    throw new CustomError('User not found', 404);
  }

  // check email rate limit - don't allow more than 1 requests in 5 minutes
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  const count = await VerificationCodeModel.findAndCountAll({
    where: {
      type: 'password-reset',
      userId: user.id,
      createdAt: {
        [Sequelize.Op.gte]: fiveMinutesAgo,
      },
    },
  });

  if (count.count >= 1) {
    throw new CustomError('Too many password reset requests', 429);
  }

  // create verification code
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
  const verificationCode = await VerificationCodeModel.create({
    userId: user.id,
    type: 'password-reset',
    expiresAt,
  });

  // send verification email with code and expiresAt. If it's expired, the code will be invalid
  const url = `${APP_ORIGIN}/password/reset?code=${
    verificationCode.id
  }&exp=${expiresAt.getTime()}`;

  // send email
  const { data, error } = await sendMail({
    to: user.email,
    ...getPasswordResetTemplate(url),
  });

  if (!data.id) {
    throw new CustomError(`${error?.name} - ${error?.message}`, 500);
  }

  // return
  return {
    url,
    emailId: data?.id,
  };
};

export const resetPassword = async ({ password, verificationCode }) => {
  // get verification code
  const verification = await VerificationCodeModel.findOne({
    where: {
      id: verificationCode,
      type: 'password-reset',
      expiresAt: {
        // grater or equal to current time
        [Sequelize.Op.gte]: Date.now(),
      },
    },
  });
  if (!verification) {
    throw new CustomError('Invalid or expired verification code', 404);
  }
  // console.log(verification.dataValues.userId);

  // find user
  const user = await UserModel.findByPk(verification.dataValues.userId);
  if (!user) {
    throw new CustomError('User not found', 404);
  }

  // encrypt password and send it to the DB
  const hashedPassword = await bcrypt.hash(password, 10);

  // update user password
  const updatedUser = await UserModel.update(
    {
      password: hashedPassword,
    },
    {
      where: {
        id: user.id,
      },
    }
  );
  if (!updatedUser) {
    throw new CustomError('Failed to reset password', 500);
  }
  // delete verification code
  await verification.destroy();

  // delete all sessions for user
  await SessionModel.destroy({
    where: {
      userId: user.id,
    },
  });

  // return
  return {
    user: {
      id: updatedUser.id,
      verified: updatedUser.verified,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    },
  };
};
