import { sequelize } from '../src/sequelize_index';
import Restaurant from '../src/models/Restaurant';
import Menu from '../src/models/Menu';
import MenuItem from '../src/models/MenuItem';

describe('Restaurant', () => {
  /**
   * Runs the code prior to all tests
   */
  beforeEach(async () => {
    // the 'sync' method will create tables based on the model class
    // by setting 'force:true' the tables are recreated each time the
    // test suite is run
    await sequelize.sync({ force: true });
  });

  test('can create a restaurant', async () => {
    const restaurant = await Restaurant.create({ name: 'Ronalds', image: 'http://some.image.url' });
    expect(restaurant.id).toBe(1);
  });

  test('restaurants have menus', async () => {
    const restaurant = await Restaurant.create({ name: 'Ronalds', image: 'http://some.image.url' });
    const menu1 = await Menu.create({
      title: 'set 1',
    });

    await restaurant.addMenu(menu1);

    await restaurant.save();

    const menus = await restaurant.getMenus();

    expect(menus[0].title).toBe('set 1');
  });

  test('restaurants can create menus', async () => {
    const restaurant = await Restaurant.create({ name: 'Ronalds', image: 'http://some.image.url' });
    await restaurant.createMenu({
      title: 'set 1',
    });

    await restaurant.save();

    const menus = await restaurant.getMenus();

    expect(menus[0].title).toBe('set 1');
  });

  test('menus have menuItems', async () => {
    const restaurant = await Restaurant.create({ name: 'Ronalds', image: 'http://some.image.url' });
    const menu = await restaurant.createMenu({
      title: 'set 1',
    });

    const menuItem = await MenuItem.create({ name: 'food 1', price: 500 });

    await menu.addMenuItem(menuItem);

    await menu.save();

    const items = await menu.getMenuItems();

    expect(items[0].name).toBe('food 1');
    expect(items[0].menu_id).toBe(1);
  });

  test('menus can create menuItems', async () => {
    const restaurant = await Restaurant.create({ name: 'Ronalds', image: 'http://some.image.url' });
    const menu = await restaurant.createMenu({
      title: 'set 1',
    });

    await menu.createMenuItem({ name: 'food 1', price: 500 });

    await menu.save();

    const items = await menu.getMenuItems();

    expect(items[0].name).toBe('food 1');
    expect(items[0].menu_id).toBe(1);
  });
});
