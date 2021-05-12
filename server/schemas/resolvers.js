const { AuthenticationError } = require('apollo-server-express');
const { Buyer, Product, Category, Order, Purchases, Sales, Seller } = require('../models');
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
          params.name = {
            $regex: name
          };
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
      buyer: async (parent, args, context) => {
        if (context.buyer) {
          const buyer = await Buyer.findById(context.buyer._id).populate({
            path: 'orders.products',
            populate: 'category'
          });
  
          buyer.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);
  
          return buyer;
        }
  
        throw new AuthenticationError('Not logged in');
      },
      seller: async (parent, args, context) => {
        if (context.buyer) {
          const seller = await Seller.findById(context.seller._id).populate({
            path: 'orders.products',
            populate: 'category'
          });
  
          seller.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);
  
          return seller;
        }
  
        throw new AuthenticationError('Not logged in');
      },
      order: async (parent, { _id }, context) => {
        if (context.user) {
          const user = await User.findById(context.user._id).populate({
            path: 'orders.products',
            populate: 'category'
          });
  
          return user.orders.id(_id);
        }
  
        throw new AuthenticationError('Not logged in');
      },
      checkout: async (parent, args, context) => {
        const url = new URL(context.headers.referer).origin;
        const order = new Order({ products: args.products });
        const { products } = await order.populate('products').execPopulate();
        const line_items = [];
  
        for (let i = 0; i < products.length; i++) {
          // generate product id
          const product = await stripe.products.create({
            name: products[i].name,
            description: products[i].description,
            //images: [`${url}/images/${products[i].image}`]
          });
  
          // generate price id using the product id
          const price = await stripe.prices.create({
            product: product.id,
            //unit_amount: products[i].price * 100,
            //currency: 'usd',
          });
  
          // add price id to the line items array
          line_items.push({
            price: price.id,
            quantity: 1
          });
        }
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items,
          mode: 'payment',
          success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${url}/`
        });
        
        return { session: session.id };
      }
    },
    Mutation: {
      addBuyer: async (parent, args) => {
        const buyer = await Buyer.create(args);
        const token = signToken(buyer);
  
        return { token, buyer };
      },
      addSeller: async (parent, args) => {
        const seller = await Seller.create(args);
        const token = signToken(seller);
  
        return { token, seller };
      },

      addOrder: async (parent, { products }, context) => {
        console.log(context);
        if (context.buyer) {
          const order = new Order({ products });
  
          await Buyer.findByIdAndUpdate(context.user._id, { $push: { orders: order } });
  
          return order;
        }
  
        throw new AuthenticationError('Not logged in');
      },
      updateBuyer: async (parent, args, context) => {
        if (context.buyer) {
          return await Buyer.findByIdAndUpdate(context.buyer._id, args, { new: true });
        }
  
        throw new AuthenticationError('Not logged in');
      },
      updateSeller: async (parent, args, context) => {
        if (context.seller) {
          return await Seller.findByIdAndUpdate(context.seller._id, args, { new: true });
        }
  
        throw new AuthenticationError('Not logged in');
      },
      updateProduct: async (parent, { _id, quantity }) => {
        const decrement = Math.abs(quantity) * -1;
  
        return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
      },
      loginBuyer: async (parent, { email, password }) => {
        const buyer = await User.findOne({ email });
  
        if (!buyer) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const correctPw = await buyer.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const token = signToken(buyer);
  
        return { token, buyer };
      },
      loginSeller: async (parent, { email, password }) => {
        const seller = await User.findOne({ email });
  
        if (!seller) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const correctPw = await seller.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const token = signToken(seller);
  
        return { token, seller };
      }
    }
  };
  
  module.exports = resolvers;