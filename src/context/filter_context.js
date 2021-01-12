import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

const initialState = {
  all_products: [],
  filterred_products: [],
  isGridview: true,
  isListview: false,
  sort: 'price-lowest',
  filters: {
    text: '',
    category: 'all',
    company: 'all',
    color: 'all',
    minPrice: 0,
    maxPrice: 0,
    price: 0,
    shipping: false
  }
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer,initialState);

  // get products from products context
  const {products} = useProductsContext();
  

  const setGridview = () => {
    dispatch({type: SET_GRIDVIEW})
  }

  const setListview = () => {
    dispatch({type: SET_LISTVIEW})
  }
  const updateSort = (e) =>{
    const value = e.target.value
    dispatch({type: UPDATE_SORT, payload: value})
  }

  /**UPDATE filters */
  const updateFilters = (e) => {
    
    const name = e.target.name;
    let value = e.target.value
    if (name === 'color')
    {
      e.preventDefault();
      value = e.target.dataset.color
    }
    if (name === 'price'){
      value = Number(value)
    }
    if (name === 'shipping')
    {
      value = e.target.checked;
    }

    dispatch({type: UPDATE_FILTERS, payload: {name, value}})
  }
  
  const clearFilters = () => {
    const max_price = state.filters.maxPrice
    dispatch({type: CLEAR_FILTERS, payload: max_price})
  }
  /** LOAD all products each time page renders */

  useEffect(()=>{
    dispatch({type: LOAD_PRODUCTS, payload: products})
  }, [products])

  /**Sort products each time the page rendered */
  useEffect(() => {
    dispatch({type: FILTER_PRODUCTS, payload: {...state}})
    dispatch({ type: SORT_PRODUCTS })

  }, [products, state.sort, state.filters])


  
  return (
    <FilterContext.Provider value={{...state, setGridview, setListview, updateSort, updateFilters, clearFilters}}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
