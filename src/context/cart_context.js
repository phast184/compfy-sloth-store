import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/cart_reducer'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions'

/**get item from local storage */
const getLocalStorage = () =>{
  let cart = localStorage.getItem('cart');
  if(cart){
    return JSON.parse(cart)
  }
  else{
    return []
  }
}

const initialState = {
  cart: getLocalStorage(),
  total_items: 0,
  total_amount: 0,
  shipping_fee: 534
}

const CartContext = React.createContext()



export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const addToCart = (id, amount, color, product) => {
    dispatch({type: ADD_TO_CART, payload: {id, amount, color, product}})
  }

  const removeCartItem = (id) => {
    const productAmount = state.cart.find(item => item.id === id).amount;
    dispatch({type: REMOVE_CART_ITEM, payload: {id, productAmount}})
  }

  const clearCart = () => {
    dispatch({type: CLEAR_CART})
  }

  const toggeCartAmount = (id, value) => {
    dispatch({type: TOGGLE_CART_ITEM_AMOUNT, payload: {id, value}})
  }


  useEffect(()=>{
    dispatch({type: COUNT_CART_TOTALS})
    //set cart to local storage each time state.cart changed
    localStorage.setItem('cart', JSON.stringify(state.cart))
  }, [state.cart])
  return (
    <CartContext.Provider value={{addToCart, ...state, removeCartItem, clearCart, toggeCartAmount}}>{children}</CartContext.Provider>
  )
}
// make sure use
export const useCartContext = () => {
  return useContext(CartContext)
}
