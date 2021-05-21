import {
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_SEEDS,
    UPDATE_CURRENT_CATEGORY,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    TOGGLE_CART,
    GET_USERID,
    PURCHASE_SEED
} from './actions';

const defaultState ={
  products: [],
  cart: [],
  cartOpen: false, 
  categories: [],
  currentCategrory: '',
  userId: '',
  seeds:0,
  parchaseSeeds:0
}

  const reducer = (state=defaultState, action) => {
    switch (action.type) {
      // if action type value is the value of `UPDATE_PRODUCTS`, return a new state object with an updated products array
      case UPDATE_PRODUCTS:
        return {
          ...state,
          products: action.products
        };
      // if action type value is the value of `UPDATE_CATEGORIES`, return a new state object with an updated categories array
      case UPDATE_CATEGORIES:
        return {
          ...state,
          categories: [...action.categories]
        };
      case UPDATE_CURRENT_CATEGORY:
        return {
          ...state,
          currentCategory: action.currentCategory
        };
      case UPDATE_SEEDS: 
        return {
          ...state, 
          seeds: action.seeds
        }

      case PURCHASE_SEED: 
        return {
          ...state, 
          parchaseSeeds: action.parchaseSeeds
        }
      case ADD_TO_CART: 
        return {
            ...state, 
            cartOpen: true, 
            cart:[...state.cart, action.product]
        };
      case ADD_MULTIPLE_TO_CART: 
        return {
            ...state, 
            cart: [...state.cart, ...action.products]
        };
      case REMOVE_FROM_CART:
        let newState = state.cart.filter(product => {
          return product._id !== action._id;
        });
        return {
          ...state,
          cartOpen: newState.length > 0,
          cart: newState
        };

      case UPDATE_CART_QUANTITY:
        return {
            ...state,
            cartOpen: true,
            cart: state.cart.map(product => {
            if (action._id === product._id) {
              product.purchaseQuantity = action.purchaseQuantity;
            }
            return product;
            })
        };
      case CLEAR_CART:
        return {
            ...state,
            cartOpen: false,
            cart: []
        };
      case TOGGLE_CART:
        return {
          ...state,
          cartOpen: !state.cartOpen
        };
      case GET_USERID:
        return {
          ...state,
          userId: action.user._id
        }
      default:
        return state;
    }
  };

export default reducer; 