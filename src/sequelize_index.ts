/* eslint-disable @typescript-eslint/no-unused-vars */
import { Sequelize, Model, DataTypes } from 'sequelize';

const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'sqlite',
  storage: './database/restaurants-seq.sqlite',
});

export { sequelize, DataTypes, Model };
