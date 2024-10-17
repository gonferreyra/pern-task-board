import { CustomError } from '../helpers/customError.js';
import UserModel from '../models/user.model.js';

export const getUserHandler = async (req, res, next) => {
  try {
    // request is already validate with autheticate middelware
    console.log(req.userId);
    const user = await UserModel.findByPk(req.userId, {
      attributes: {
        exclude: ['password'],
      },
    });
    if (!user) {
      throw new CustomError('User not found', 404);
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    next(error);
  }
};
