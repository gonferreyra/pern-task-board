import { CustomError } from '../helpers/customError.js';
import { verifyToken } from '../utils/jwt.js';

const authenticate = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    throw new CustomError('Not authorized', 401);
  }

  const { payload, error } = verifyToken(accessToken, 'accessToken');

  // console.log('payload: ', payload, 'error: ', error);
  if (!payload) {
    throw new CustomError(
      error === 'jwt expired' ? 'Expired token' : 'Invalid token',
      401
    );
  }

  // we asing userId and sessionId to be available on request
  req.userId = payload.userId;
  req.sessionId = payload.sessionId;

  next();
};

export default authenticate;
