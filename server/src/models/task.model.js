import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const TaskModel = sequelize.define(
  'Task',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'coding',
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'to-do',
    },
  },
  {
    timestamps: true,
  }
);

export default TaskModel;
