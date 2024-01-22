import { CartAction } from "../actions";

const initialState = {
  cart: {},
  isLoading: false,
  cartItems: [],
  metaData: {
    itemsTotal: 0,
    discount: 0,
    grandTotal: 0,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CartAction.types.GET_CART_ITEMS:
      return { ...state, cart: action?.payload };
    case CartAction.types.SET_IS_LOADING:
      return { ...state, isLoading: action?.payload };

    default:
      return state;
  }
};


