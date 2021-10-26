import { sequelize, DataTypes, Model } from './sequelize_index';
// eslint-disable-next-line import/no-cycle
import Menu from './Menu';

/**
 * Represents a Restaurant
 */
export default class Restaurant extends Model {
  public id!: number;

  public name!: string;

  public menus!: Menu[];

  public image!: string;

  async addMenu(title: string) {
    const menu = new Menu({ title, restaurant_id: this.id });
    await menu.save();
    this.menus.push(menu);
  }
}

Restaurant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    sequelize,
    timestamps: false,
  },
);

Restaurant.hasMany(Menu, { as: 'menus', foreignKey: 'restaurant_id' });
