import { z } from 'zod';
import * as services from '../services/auth.service.js';
import { setAuthenticationCookies } from '../utils/cookies.js';

const registerSchema = z.object({
  email: z.string().email().min(6).max(255),
  password: z.string().min(6).max(20),
});

export const registerHandler = async (req, res, next) => {
  try {
    // validate request
    const request = registerSchema.parse(req.body);

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
