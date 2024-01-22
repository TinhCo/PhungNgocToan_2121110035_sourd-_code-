// Trong file reducers/orderReducer.js
const initialState = {
  // ...các trường khác
  orderPlaced: false,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PLACE_ORDER_SUCCESS":
      return {
        ...state,
        orderPlaced: true,
      };
    // ...các case khác
    default:
      return state;
  }
};

export default orderReducer;
