/* eslint-disable import/no-cycle */
import {
  Association,
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  Optional,
} from 'sequelize/types';
import Restaurant from './Restaurant';
import MenuItem from './MenuItem';
import { sequelize, DataTypes, Model } from '../sequelize_index';

interface MenuAttributes {
  id: number;

  title: string;

  restaurant_id: number | null;
}

interface MenuCreationAttributes extends Optional<MenuAttributes, 'id' | 'restaurant_id'> {}
/**
 * Represents a Menu
 */
export default class Menu extends Model<MenuAttributes, MenuCreationAttributes>
  implements MenuAttributes {
  public id!: number;

  public title!: string;

  public restaurant_id!: number | null;

  public getMenuItems!: HasManyGetAssociationsMixin<MenuItem>;

  public addMenuItem!: HasManyAddAssociationMixin<MenuItem, number>;

  public hasMenuItem!: HasManyHasAssociationMixin<MenuItem, number>;

  public countMenuItems!: HasManyCountAssociationsMixin;

  public createMenuItem!: HasManyCreateAssociationMixin<MenuItem>;

  public readonly menuItems?: MenuItem[];

  public static associations: {
    menuItems: Association<Restaurant, MenuItem>;
  };
}

Menu.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    restaurant_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Restaurant,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
  },
);

Menu.hasMany(MenuItem, {
  sourceKey: 'id',
  foreignKey: 'menu_id',
  as: 'menuItems',
});
