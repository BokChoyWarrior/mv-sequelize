import { readFileSync } from 'fs';
import { sequelize } from './sequelize_index';

import Restaurant from './models/Restaurant';

(async () => {
  const restaurantsObjects = JSON.parse(readFileSync('./restaurant-data.json', 'utf8'));

  await sequelize.sync({ force: true });

  restaurantsObjects.forEach(async (_restaurant: any) => {
    const restaurant = await Restaurant.create({
      name: _restaurant.name,
      image: _restaurant.image,
    });

    _restaurant.menus.forEach(async (_menu: any) => {
      const menu = await restaurant.createMenu({ title: _menu.title });

      _menu.items.forEach(async (_menuItem: any) => {
        const menuItem = await menu.createMenuItem({
          name: _menuItem.name,
          price: _menuItem.price,
        });
        menuItem.save();
      });
      menu.save();
    });
    restaurant.save();
  });
})();
