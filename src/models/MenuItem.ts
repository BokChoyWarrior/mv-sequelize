/* eslint-disable import/no-cycle */
import { Optional } from 'sequelize/types';
import Menu from './Menu';
import { sequelize, DataTypes, Model } from '../sequelize_index';

interface MenuItemAttributes {
  id: number;

  name: string;

  price: number;

  menu_id: number;
}

interface MenuItemCreationAttributes extends Optional<MenuItemAttributes, 'id' | 'menu_id'> {}
/**
 * Represents a MenuItem
 */
export default class MenuItem extends Model<MenuItemAttributes, MenuItemCreationAttributes>
  implements MenuItemAttributes {
  public id!: number;

  public name!: string;

  public price!: number;

  public menu_id!: number;
}
MenuItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    menu_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Menu,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
  },
);
