import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_REFRESH_SECRET } from '../constants/env.js';

const tokenSecrets = {
  accessToken: JWT_SECRET,
  refreshToken: JWT_REFRESH_SECRET,
};

export const verifyToken = (token, tokenType) => {
  try {
    const secret = tokenSecrets[tokenType];
    if (!secret) {
      throw new Error(`Invalid token type ${tokenType}`);
    }
    const payload = jwt.verify(token, secret, {
      audience: ['user'],
    });
    return { payload };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};
