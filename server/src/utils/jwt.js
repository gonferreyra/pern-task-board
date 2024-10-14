import jwt from 'jsonwebtoken';
import { JWT_REFRESH_SECRET } from '../constants/env.js';

export const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, JWT_REFRESH_SECRET, {
      audience: ['user'],
    });
    return payload;
  } catch (error) {
    throw new Error(error.message);
  }
};
