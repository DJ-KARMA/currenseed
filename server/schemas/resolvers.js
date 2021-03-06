const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Category, Order, Purchases, Sales } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
    products: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }
  
      if (name) {
        params.name = { $regex: name };
      }

      return await Product.find(params).populate('category');
    },
    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate('category');
    },
    sales: async(parent, {_id}) => {
      return await Sales.findById(_id).populate('sales');
    },
    purchases: async(parent, {_id}) => {
      return await Purchases.findById(_id).populate('purchases');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id)
        .populate({
          path: 'orders.products',
          populate: 'category'
        })
        .populate({
          path: 'purchases.products',
          populate: 'category'
        })
        .populate({
          path: 'sales.products',
          populate: 'category'
        });
  
        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);
  
        return user;
      }
  
      throw new AuthenticationError('Not logged in');
    },
    getUserById: async (parent, args, context) => {
      
        const user = await User.findById(args._id)
        .populate({
          path: 'orders.products',
          populate: 'category'
        })
        .populate({
          path: 'purchases.products',
          populate: 'category'
        })
        .populate({
          path: 'sales.products',
          populate: 'category'
        });
  
        user.purchases.sort((a, b) => b.purchaseDate - a.purchaseDate);
        user.sales.sort((a, b) => b.purchaseDate - a.purchaseDate);

      if (user) {
        return user;
      }
  
      throw new AuthenticationError('Not available');
    },
    orders: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category'
        });
  
        return user.orders.id(_id);
      }
  
      throw new AuthenticationError('Not logged in');
    },
    checkout: async (parent, { price, quantity }, context) => {
      const url = new URL(context.headers.referer).origin;
  
      const line_items = [];
  
        const product = await stripe.products.create({
          name: `${quantity} seeds`,
        });
  
        // generate price id using the product id
        const price1 = await stripe.prices.create({
          product: product.id,
          unit_amount: parseFloat( price) * 100,
          currency: 'usd',
        });
  
        // add price id to the line items array
        line_items.push({
          price: price1.id,
          quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/SeedSuccess?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });
        
      return { session: session.id };
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
  
      return { token, user };
    },
    addOrder: async (parent, { products }, context) => {
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });
  
        return order;
      }
  
      throw new AuthenticationError('Not logged in');
    },
    addPurchase: async (parent, { products }, context) => {
      if (context.user) {
        const purchase = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, { $push: { purchases: purchase } });
  
        return purchase;
      }
  
      throw new AuthenticationError('Not logged in');
    },
    addSaleById: async (parent, {_id, products}, context) => {
        const sale = new Order({ products });

        await User.findByIdAndUpdate(_id, { $push: { sales: sale } },{new: true});
  
        return sale;
      },

    addSeeds: async (parent, {_id, seeds }) => {
      const increment = Math.random().toPrecision(2);

      return await User.findByIdAndUpdate(_id, {$inc: { seeds: increment }},{new: true});
    },
    addSeedsById: async (parent, {_id, seeds }) => {
      const increment = parseFloat(seeds);

      return await User.findByIdAndUpdate(_id, {$inc: { seeds: increment }},{new: true});
    },
    purchaseSeeds: async (parent, {seeds },context) => {
      const increment = parseFloat(seeds);

      return await User.findByIdAndUpdate(context.user._id, {$inc: { seeds: increment }},{new: true});
    },
    spendSeeds: async (parent, {seeds}, context) => {
      const decrease = parseFloat(seeds);
      return await User.findByIdAndUpdate(context.user._id, {$inc: {seeds: - decrease }}, {new: true})
    },
    addProduct: async (parent,  data , context) => {
      if(context.user) {
        const category = await Category.findOne({name:data.category});
        const product = await Product.create({name:data.name, description:data.description, price:data.price, quantity:data.quantity, category:category._id, sellerId: context.user._id });
        const user = await User.findByIdAndUpdate(context.user._id, { $push: { products: product } }, {new: true});

        return user; 
      }
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }
  
      throw new AuthenticationError('Not logged in');
    },
    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;
  
      return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    },
    createProduct: async(parent, { productInfo }, context) => {
      if (context.user) {
        const updateUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { products : productInfo } },
          { new: true }
        );
        return updateUser;
      }
      throw new AuthenticationError('You must be logged in to add a new product to your shop')
    },
    deleteProduct: async (parent, { productId }, context) => {
      if (context.user) {
        const increment = Math.random().toPrecision(2) *-1;

        console.log ("increment",increment);
        console.log ("productId",productId);
        
        const updateProduct = await Product.findByIdAndDelete(
          { _id: productId }
        );

        const updateUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { products: { _id: productId }} ,$inc: { seeds: increment }},
          { new: true }
        );

        console.log("updateUser",updateUser);
        return updateUser;
      }
      throw new AuthenticationError('You must be logged in to remove a product from your shop')
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
  
      if (!user) {
        throw new AuthenticationError('Incorrect email');
      }
  
      const correctPw = await user.isCorrectPassword(password);
  
      if (!correctPw) {
        throw new AuthenticationError('Incorrect password');
      }
  
      const token = signToken(user);
  
      return { token, user };
    }
  }
};
  
module.exports = resolvers;