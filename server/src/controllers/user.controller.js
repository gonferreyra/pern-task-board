import { CustomError } from '../helpers/customError.js';
import UserModel from '../models/user.model.js';

export const getUserHandler = async (req, res, next) => {
  try {
    // request is already validate with autheticate middelware
    console.log(req.userId);
    const user = await UserModel.findByPk(req.userId);
    if (!user) {
      throw new CustomError('User not found', 404);
    }

    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        verified: user.verified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};
