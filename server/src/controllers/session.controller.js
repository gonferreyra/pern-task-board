import { Sequelize } from 'sequelize';
import SessionModel from '../models/session.model.js';
import { CustomError } from '../helpers/customError.js';
import { z } from 'zod';

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

export const deleteSessionHandler = async (req, res, next) => {
  try {
    // validate request
    const sessionId = z.string().parse(req.params.id);

    const deleted = await SessionModel.destroy({
      where: {
        id: sessionId,
        // we pass the userId so that it doesn't delete other users sessions so the user making the request must be the user that created the session
        userId: req.userId,
      },
    });
    if (!deleted) {
      throw new CustomError('Session not found', 404);
    }

    res.status(200).json({
      message: 'Session deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
