import { z } from 'zod';
import * as services from '../services/auth.service.js';
import {
  clearAuthenticationCookies,
  setAuthenticationCookies,
} from '../utils/cookies.js';
import { JWT_SECRET } from '../constants/env.js';
import jwt from 'jsonwebtoken';
import SessionModel from '../models/session.model.js';
import { CustomError } from '../helpers/customError.js';
import { verifyToken } from '../utils/jwt.js';
import { fifteenMinutesFromNow, thirtyDaysFromNow } from '../utils/date.js';

const registerSchema = z.object({
  email: z.string().email().min(6).max(255),
  password: z.string().min(6).max(20),
  userAgent: z.string().optional(),
});

const loginSchema = registerSchema.extend();

const secure = process.env.NODE_ENV === 'production';

export const registerHandler = async (req, res, next) => {
  try {
    // validate request
    const request = registerSchema.parse({
      ...req.body,
      userAgent: req.headers['user-agent'],
    });

    // call service
    const { user, accessToken, refreshToken } = await services.createAccount(
      request
    );
    // set cookies with response
    setAuthenticationCookies({ res, accessToken, refreshToken })
      .status(201)
      .json(user);
  } catch (error) {
    next(error);
  }
};

export const loginHandler = async (req, res, next) => {
  try {
    // validate request
    const request = loginSchema.parse({
      ...req.body,
      userAgent: req.headers['user-agent'],
    });

    // call service
    const { user, accessToken, refreshToken } = await services.login(request);

    // response
    setAuthenticationCookies({ res, accessToken, refreshToken })
      .status(200)
      .json({
        message: 'Login succesfull',
      });
  } catch (error) {
    next(error);
  }
};

export const logoutHandler = async (req, res, next) => {
  try {
    // validate request
    const accessToken = req.cookies.accessToken;
    const payload = verifyToken(accessToken);

    if (payload) {
      await SessionModel.destroy({
        where: {
          id: payload.sessionId,
        },
      });
    }

    //clear cookies
    clearAuthenticationCookies(res)
      .status(200)
      .json({ message: 'Logout succesfull' });
  } catch (error) {
    next(error);
  }
};

export const refreshHandler = async (req, res, next) => {
  try {
    // validate request
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new CustomError('Missing refresh token', 401);
    }

    // call service
    const { accessToken, newRefreshToken } =
      await services.refreshUserAccessToken(refreshToken);

    // set cookies
    if (newRefreshToken) {
      res.cookie('refreshToken', newRefreshToken, {
        sameSite: 'strict',
        httpOnly: true,
        secure,
        expires: thirtyDaysFromNow(),
        path: '/auth/refresh',
      });
    }

    res
      .status(200)
      .cookie('accessToken', accessToken, {
        sameSite: 'strict',
        httpOnly: true,
        secure,
        expires: fifteenMinutesFromNow(),
      })
      .json({
        message: 'Access token refreshed',
      });
  } catch (error) {
    next(error);
  }
};
