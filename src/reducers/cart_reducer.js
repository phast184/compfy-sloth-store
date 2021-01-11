import { FaInstagramSquare } from "react-icons/fa";
import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    /**use tempItem in case of there are the same item but different color */
    const { id, amount, color, product } = action.payload;
    /**the action below allows to save the same item but with differrent color
     * in the cart by change item's id to id + color
     */
    const tempItem = state.cart.find((item) => item.id === id + color);

    /**if there is an existing item
     * find that item and then update the amount and price
     * at this time, price = product.price * amount of that item
     *  */
    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        /**IF THE ITEM IS ALREADY IN THE CART, WE NEED TO UPDATE THE NEW AMOUNT */
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount;

          // if newAmount is more than the stock of cartItem, set them = stock
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max;
          }

          return { ...cartItem, amount: newAmount };
        } else {
          return cartItem;
        }
      });

      return {
        ...state,
        cart: tempCart,
      };
    } else {
      /**if there is no existing items, create a new item object */
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      };

      return {
        ...state,
        cart: [...state.cart, newItem],
      };
    }
  }

  if (action.type === REMOVE_CART_ITEM) {
    const { id, productAmount: oldAmount } = action.payload;
    const tempCart = state.cart.filter((item) => item.id !== id);
    let temptTotalItems = state.total_items - 1;
    let tempTotalAmount = state.total_amount - oldAmount;

    if (tempTotalAmount < 0) {
      tempTotalAmount = 0;
    }
    if (temptTotalItems < 0) {
      temptTotalItems = 0;
    }

    return {
      ...state,
      cart: tempCart,
      total_items: temptTotalItems,
      total_amount: tempTotalAmount,
    };
  }

  if (action.type === CLEAR_CART) {
    return {
      ...state,
      cart: [],
      total_items: 0,
      total_amount: 0,
    };
  }

  /**if value = inc then increase the amount of given product by one
   * if the amount >= stock => amount = stock
   *
   */
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    let tempCart = state.cart.map((item) => {
      if (item.id === id) {
        let newAmount = item.amount;
        if (value === "inc") {
          newAmount += 1;
          if (newAmount > item.max) {
            newAmount = item.max;
          }
        }
        if (value === "dec") {
          newAmount -= 1;
          if (newAmount < 1) {
            newAmount = 1;
          }
        }
        return { ...item, amount: newAmount };
      } else {
        return item;
      }
    });
    return {
      ...state,
      cart: tempCart,
    };
  }

  if (action.type === COUNT_CART_TOTALS) {
    const {total_items, total_amount} = state.cart.reduce((total, item) => {
      const {amount, price} = item;
      total.total_items += amount;
      total.total_amount += price * amount
      return total
    }, {

      /**if there is no item, return the default value as below */
      total_items: 0,
      total_amount: 0,
    });

    return{
      ...state,
      total_items,
      total_amount
    }
  }
  return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
