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
import state_reducer from "@/reducer/state_reducer";
import { createContext, useContext, useReducer } from "react";
import { toast } from "react-hot-toast";

const StateContext = createContext();

const initialState = {
  showCart: false,
  cartItems: [],
  totalPrice: 0,
  totalQuantities: 0,
  qty: 1,
};

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(state_reducer, initialState);

  const incQty = () => {
    dispatch({ type: INCREASE_QTY });
  };

  const decQty = () => {
    dispatch({ type: DECREASE_QTY });
  };

  const onAdd = (prod, qty) => {
    dispatch({ type: ADD_TO_CART, payload: { product: prod, quantity: qty } });
    toast.success(`${qty} ${prod.name} added to the cart`);
  };

  const setShowCartTrue = () => {
    dispatch({ type: SET_SHOW_CART_TRUE });
  };

  const setShowCartFalse = () => {
    dispatch({ type: SET_SHOW_CART_FALSE });
  };

  const updateCartItemQty = (id, value) => {
    dispatch({ type: UPDATE_CART_ITEM_QTY, payload: { id, value } });
  };

  const removecartItem = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: { id } });
  };

  const resetState = () => {
    dispatch({ type: RESET_STATE });
  };

  return (
    <StateContext.Provider
      value={{
        ...state,
        incQty,
        decQty,
        onAdd,
        setShowCartTrue,
        setShowCartFalse,
        updateCartItemQty,
        removecartItem,
        resetState,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  return useContext(StateContext);
};
