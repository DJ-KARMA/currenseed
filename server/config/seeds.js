const db = require('./connection');
const { Buyer, Seller, Order, Purchases, Sales, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
  ]);

  console.log('categories seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
  ]);

  console.log('products seeded');

  await Seller.deleteMany();

  await Seller.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await Seller.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('sellers seeded');

  process.exit();
});