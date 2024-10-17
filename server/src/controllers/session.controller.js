import { Sequelize } from 'sequelize';
import SessionModel from '../models/session.model.js';

export const getSessionHandler = async (req, res, next) => {
  try {
    // validate request
    const session = await SessionModel.findAll({
      where: {
        userId: req.userId,
        // don't return expired sessions
        expiresAt: {
          [Sequelize.Op.gt]: Date.now(),
        },
      },
      attributes: ['id', 'userAgent', 'createdAt'],
      order: [['createdAt', 'DESC']],
      // limit: 10,
    });

    // allow the user to delete it's sessiones. but NOT the current one
    res.status(200).json(
      session.map((session) => ({
        ...session.dataValues,
        ...(session.id === req.sessionId && {
          isCurrentSession: true,
        }),
      }))
    );
  } catch (error) {
    next(error);
  }
};
