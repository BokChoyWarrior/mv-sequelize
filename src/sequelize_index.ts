import { Sequelize, DataTypes, Model } from 'sequelize';

const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'sqlite',
  storage: './restaurants-seq.sqlite',
});

export { sequelize, DataTypes, Model };
