import { z } from 'zod';
import * as services from '../services/auth.service.js';
import {
  clearAuthenticationCookies,
  setAuthenticationCookies,
} from '../utils/cookies.js';
import { JWT_SECRET } from '../constants/env.js';
import jwt from 'jsonwebtoken';
import SessionModel from '../models/session.model.js';

const registerSchema = z.object({
  email: z.string().email().min(6).max(255),
  password: z.string().min(6).max(20),
  userAgent: z.string().optional(),
});

const loginSchema = registerSchema.extend();

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

const verifyToken = (token, options) => {
  try {
    const payload = jwt.verify(token, JWT_SECRET, {
      audience: ['user'],
    });
    return payload;
  } catch (error) {
    throw new Error(error.message);
  }
};
// ver error cuando no hay accessToken
