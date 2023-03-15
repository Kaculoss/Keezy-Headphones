import {
  ADD_TO_CART,
  DECREASE_QTY,
  INCREASE_QTY,
  REMOVE_CART_ITEM,
  RESET_STATE,
  SET_SHOW_CART_FALSE,
  SET_SHOW_CART_TRUE,
  UPDATE_CART_ITEM_QTY,
} from "@/actions";

const state_reducer = (state, action) => {
  if (action.type === INCREASE_QTY) {
    return { ...state, qty: state.qty + 1 };
  }

  if (action.type === DECREASE_QTY) {
    let number = state.qty - 1 < 1 ? 1 : state.qty - 1;
    return { ...state, qty: number };
  }

  if (action.type === ADD_TO_CART) {
    const { product, quantity } = action.payload;

    const prodInCart = state.cartItems?.find((item) => item._id === product._id)
      ? true
      : false;

    if (prodInCart) {
      const updatedCartItems = state.cartItems.map((cart) => {
        if (cart._id === product._id)
          return { ...cart, quantity: cart.quantity + quantity };
      });

      return {
        ...state,
        totalPrice: state.totalPrice + product.price * quantity,
        totalQuantities: state.totalQuantities + quantity,
        cartItems: updatedCartItems,
        qty: 1,
      };
    } else {
      return {
        ...state,
        cartItems: [...state.cartItems, { ...product, quantity }],
        totalPrice: state.totalPrice + product.price * quantity,
        totalQuantities: state.totalQuantities + quantity,
        qty: 1,
      };
    }
  }

  if (action.type === SET_SHOW_CART_TRUE) {
    return { ...state, showCart: true };
  }

  if (action.type === SET_SHOW_CART_FALSE) {
    return { ...state, showCart: false };
  }

  if (action.type === UPDATE_CART_ITEM_QTY) {
    const { id, value } = action.payload;
    let currentItem = state.cartItems.find((item) => item._id === id);
    let filteredCartItems = state.cartItems.filter((item) => item._id !== id);
    let newTotalPrice =
      state.totalPrice - currentItem.price * currentItem.quantity;
    let newTotalQuantities = state.totalQuantities - currentItem.quantity;

    if (value === "inc") {
      currentItem = { ...currentItem, quantity: currentItem.quantity + 1 };
      return {
        ...state,
        cartItems: [...filteredCartItems, currentItem],
        totalPrice: newTotalPrice + currentItem.price * currentItem.quantity,
        totalQuantities: newTotalQuantities + currentItem.quantity,
      };
    } else if (value === "dec") {
      let number = currentItem.quantity - 1 < 1 ? 1 : currentItem.quantity - 1;
      currentItem = { ...currentItem, quantity: number };
      return {
        ...state,
        cartItems: [...filteredCartItems, currentItem],
        totalPrice: newTotalPrice + currentItem.price * currentItem.quantity,
        totalQuantities: newTotalQuantities + currentItem.quantity,
      };
    }
  }

  if (action.type === REMOVE_CART_ITEM) {
    const { id } = action.payload;
    let currentItem = state.cartItems.find((item) => item._id === id);
    let filteredCartItems = state.cartItems.filter((item) => item._id !== id);
    let newTotalPrice =
      state.totalPrice - currentItem.price * currentItem.quantity;
    let newTotalQuantities = state.totalQuantities - currentItem.quantity;
    return {
      ...state,
      cartItems: [...filteredCartItems],
      totalPrice: newTotalPrice,
      totalQuantities: newTotalQuantities,
    };
  }

  if (action.type === RESET_STATE) {
    return {
      ...state,
      showCart: false,
      cartItems: [],
      totalPrice: 0,
      totalQuantities: 0,
      qty: 1,
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default state_reducer;
