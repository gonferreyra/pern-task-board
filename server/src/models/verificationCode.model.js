import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const VerificationCodeModel = sequelize.define('VerificationCode', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    values: ['email-verification' || 'password-reset'],
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

export default VerificationCodeModel;