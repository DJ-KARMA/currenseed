const db = require('./connection');
const { User, Order, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Craft Beer' },
    { name: 'Fresh Produce' },
    { name: 'Jewelry' },
    { name: 'Artisan Cheese' },
    { name: 'Fresh Meat' },
    { name: 'Handmade Items' },
    { name: 'Baked Goods' },
    { name: 'Wine' }
  ]);

  console.log('categories seeded');

  // await Product.deleteMany();

  // const products = await Product.insertMany([
  // ]);

  // console.log('products seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});