import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { thirtyDaysFromNow } from '../utils/date.js';

const SessionModel = sequelize.define('Session', {
  userAgent: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: thirtyDaysFromNow(),
  },
});

export default SessionModel;
