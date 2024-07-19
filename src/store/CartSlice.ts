import { createSlice } from "@reduxjs/toolkit";
import { CartProduct } from "../interfaces/CartProduct";

const saveToLocalStorage = (state: CartProduct[]) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cart", serializedState);
  } catch (err) {
    console.log("Could not save", err);
  }
};

const loadFromLocalStorage = (): CartProduct[] => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState != null)
      return JSON.parse(serializedState) as CartProduct[];
  } catch (err) {
    console.log("Could not load", err);
  }
  return [];
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadFromLocalStorage(),
  reducers: {
    addItemToCart: (state, action) => {
      state.push(action.payload);
      saveToLocalStorage(state);
    },
    removeItemFromCart: (state, action) => {
      const updatedState = state.filter(
        (item: CartProduct) => item.id !== action.payload
      );
      saveToLocalStorage(updatedState);
      return updatedState;
    },
    setItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      console.log(quantity, "slice");
      return state.map((cartItem) => {
        if (cartItem.id === id) {
          return { ...cartItem, quantity: quantity };
        } else return cartItem;
      });
    },
  },
});

export const cartAction = cartSlice.actions;
export default cartSlice;
