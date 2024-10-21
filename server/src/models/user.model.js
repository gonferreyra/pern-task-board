import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import SessionModel from './session.model.js';
import VerificationCodeModel from './verificationCode.model.js';

const UserModel = sequelize.define(
  'User',
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true, // make sure sequelize handle this fields automatically
  }
);

// relations User => Sessions
UserModel.hasMany(SessionModel, { foreignKey: 'userId' });
SessionModel.belongsTo(UserModel, { foreignKey: 'userId' });

// relations User => VerificationCode
UserModel.hasMany(VerificationCodeModel, {
  foreignKey: 'userId',
});
VerificationCodeModel.belongsTo(UserModel, {
  foreignKey: 'userId',
});

export default UserModel;
