const db = require('./connection');
const { User, Product, Category, Order } = require('../models');

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
    products: await Product.insertMany ([
      {
        name: 'Tin of Cookies',
        description:
          'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
        image: 'baked-goods-2-min.jpg',
        category: categories[6]._id,
        price: 10,
        quantity: 20
      },
      {
        name: 'Necklaces',
        description:
          'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
        image: 'jewelry-1-min.jpg',
        category: categories[2]._id,
        price: 2.99,
        quantity: 500
      },
      {
        name: 'Bread Loaves',
        description:
          'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
        image: 'baked-goods-1-min.jpg',
        category: categories[6]._id,
        price: 2.99,
        quantity: 500
      },
      {
        name: 'Tin of Cookies',
        description:
          'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
        image: 'cookie-tin.jpg',
        category: categories[0]._id,
        price: 2.99,
        quantity: 500
      }
    ]),
    sales: await Order.insertMany([
      {
        products: []
      }
    ]),
    purchases: await Order.insertMany([
      {
        products: []
      }
    ])
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345',
    purchases: await Order.insertMany([
      {
        products: []
      }
    ])
  });

  console.log('users seeded');

  process.exit();
});