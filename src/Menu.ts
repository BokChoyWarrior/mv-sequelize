// eslint-disable-next-line import/no-cycle
import Restaurant from './Restaurant';
import { sequelize, DataTypes, Model } from './sequelize_index';

/**
 * Represents a Menu
 */
export default class Menu extends Model {
  public id!: number;

  public title!: string;

  public image!: string;

  public restaurant_id!: number;
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
Menu.belongsTo(Restaurant, { foreignKey: 'restaurant_id' });
