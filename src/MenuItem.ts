import Menu from './Menu';
import { sequelize, DataTypes, Model } from './sequelize_index';

/**
 * Represents a MenuItem
 */
export default class MenuItem extends Model {
  public id!: number;

  public name!: string;

  public price!: number;
}
MenuItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
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
