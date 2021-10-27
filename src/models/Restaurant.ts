import {
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Association,
  Optional,
} from 'sequelize/types';
import { sequelize, DataTypes, Model } from '../sequelize_index';
// eslint-disable-next-line import/no-cycle
import { Menu } from './Menu';

interface RestaurantAttributes {
  id: number;

  name: string;

  image: string;
}
interface RestaurantCreationAttributes extends Optional<RestaurantAttributes, 'id'> {}
/**
 * Represents a Restaurant
 */
export default class Restaurant extends Model<RestaurantAttributes, RestaurantCreationAttributes>
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
Restaurant.hasMany(Menu, {
  sourceKey: 'id',
  foreignKey: 'restaurant_id',
  as: 'menus',
});
