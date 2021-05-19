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

  await Product.deleteMany();

  const products = await Product.insertMany([
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
      price: 30,
      quantity: 5
    },
    {
      name: 'Bread Loaves',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'baked-goods-1-min.jpg',
      category: categories[6]._id,
      price: 4,
      quantity: 15
    },
    {
      name: 'Oranges',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'produce-3-min.jpg',
      category: categories[1]._id,
      price: 3,
      quantity: 10
    },
    {
      name: 'White Wine',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'wine-1-min.jpg',
      category: categories[7]._id,
      price: 40,
      quantity: 5 
    },
    {
      name: 'Handmade Soap',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'soap-1-min.jpg',
      category: categories[5]._id,
      price: 15,
      quantity: 9
    },
    {
      name: 'Lamp Chops',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'meat-2-min.jpg',
      category: categories[4]._id,
      price: 15,
      quantity: 20
    },
    {
      name: 'Steak',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'meat-1-min.jpg',
      category: categories[4]._id,
      price: 10,
      quantity: 16
    },
    {
      name: 'Munster',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'cheese-3-min.jpg',
      category: categories[3]._id,
      price: 7,
      quantity: 25
    },
    {
      name: 'Cheese tray',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'cheese-2-min.jpg',
      category: categories[3]._id,
      price: 35,
      quantity: 5
    }
  ]);

  console.log('products seeded');

  await Order.deleteMany();

  const orders = await Order.insertMany([
    {
      products: [products[0]._id, products[1]._id, products[2]._id],
      sellerId: 'Pamela',
      buyerId: 'Elijah'
    },
    {
      products: [products[1]._id],
      sellerId: 'Bobbi',
      buyerId: 'Pamela'
    },
    {
      products: [products[1]._id, products[4]._id],
      sellerId: 'Bobbi',
      buyerId: 'Elijah'
    }
  ]);

  console.log('orders seeded');


  await User.deleteMany();


  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@test.com',
    password: 'password12345',
    products: [products[0], products[2], products[3]],
    sales: [
      orders[0]
    ],
    purchases: [
      orders[1]
    ]
  });

  await User.create({
    firstName: 'Bobbi',
    lastName: 'Graham',
    email: 'bgraham@test.com',
    password: 'password12345',
    products: [products[1], products[4], products[8], products[9]],
    purchases: [],
    sales: [
      orders[1],
      orders[2]
    ]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@test.com',
    password: 'password12345',
    purchases:[
      orders[0],
      orders[2]
    ],
    sales:[]
  });

  console.log('users seeded');

  process.exit();
});