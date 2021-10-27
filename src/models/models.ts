/* eslint-disable max-classes-per-file */

import {
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  BelongsToGetAssociationMixin,
  Association,
  Optional,
} from 'sequelize/types';

import { sequelize, DataTypes, Model } from '../sequelize_index';

interface RestaurantAttributes {
  id: number;

  name: string;

  image: string;
}

interface MenuAttributes {
  id: number;

  title: string;

  restaurant_id: number | null;
}

interface MenuItemAttributes {
  id: number;

  name: string;

  price: number;

  menu_id: number | null;
}

interface RestaurantCreationAttributes extends Optional<RestaurantAttributes, 'id'> {}

interface MenuCreationAttributes extends Optional<MenuAttributes, 'id' | 'restaurant_id'> {}

interface MenuItemCreationAttributes extends Optional<MenuItemAttributes, 'id' | 'menu_id'> {}

/**
 * Represents a Restaurant
 */
export class Restaurant extends Model<RestaurantAttributes, RestaurantCreationAttributes>
  implements RestaurantAttributes {
  public id!: number;

  public name!: string;

  public image!: string;

  public getMenus!: HasManyGetAssociationsMixin<Menu>; // Note the null assertions!

  public addMenu!: HasManyAddAssociationMixin<Menu, number>;

  public hasMenu!: HasManyHasAssociationMixin<Menu, number>;

  public countMenus!: HasManyCountAssociationsMixin;

  public createMenu!: HasManyCreateAssociationMixin<Menu>;

  public readonly menus?: Menu[];

  public static associations: {
    menus: Association<Restaurant, Menu>;
  };
}

export class Menu extends Model<MenuAttributes, MenuCreationAttributes> implements MenuAttributes {
  public id!: number;

  public title!: string;

  public restaurant_id!: number | null;

  public getMenuItems!: HasManyGetAssociationsMixin<MenuItem>;

  public addMenuItem!: HasManyAddAssociationMixin<MenuItem, number>;

  public hasMenuItem!: HasManyHasAssociationMixin<MenuItem, number>;

  public countMenuItems!: HasManyCountAssociationsMixin;

  public createMenuItem!: HasManyCreateAssociationMixin<MenuItem>;

  public getRestaurant!: BelongsToGetAssociationMixin<Restaurant>;

  public readonly menuItems?: MenuItem[];

  public static associations: {
    menuItems: Association<Restaurant, MenuItem>;
  };
}
/**
 * Represents a MenuItem
 */
export class MenuItem extends Model<MenuItemAttributes, MenuItemCreationAttributes>
  implements MenuItemAttributes {
  public id!: number;

  public name!: string;

  public price!: number;

  public menu_id!: number;

  public getMenu!: BelongsToGetAssociationMixin<Menu>;
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

Restaurant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    image: DataTypes.STRING,
  },
  {
    tableName: 'restaurants',
    sequelize,
    timestamps: false,
  },
);

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

Restaurant.hasMany(Menu, {
  sourceKey: 'id',
  foreignKey: 'restaurant_id',
  as: 'menus',
});

Menu.hasMany(MenuItem, {
  sourceKey: 'id',
  foreignKey: 'menu_id',
  as: 'menuItems',
});
