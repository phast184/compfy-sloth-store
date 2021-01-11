import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    /**find the max price to set the default value */
    let max_price = action.payload.map((product) => product.price);
    max_price = Math.max(...max_price);
    return {
      ...state,
      /**use spread operator to copy the value of payload
       * therefore, if we make a change, it won't effect the original value
       */
      all_products: [...action.payload],
      filterred_products: [...action.payload],
      filters: {
        ...state.filters,
        maxPrice: max_price,
        price: max_price,
      },
    };
  }

  if (action.type === SET_GRIDVIEW) {
    return {
      ...state,
      isGridview: true,
      isListview: false,
    };
  }

  if (action.type === SET_LISTVIEW) {
    return {
      ...state,
      isGridview: false,
      isListview: true,
    };
  }

  if (action.type === UPDATE_SORT) {
    return {
      ...state,
      sort: action.payload,
    };
  }

  if (action.type === SORT_PRODUCTS) {
    let tempProducts = [...state.filterred_products];
    if (state.sort === "price-lowest") {
      tempProducts = tempProducts.sort((a, b) => a.price - b.price);
    }
    if (state.sort === "price-highest") {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price);
    }
    if (state.sort === "name-a") {
      tempProducts = tempProducts.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (state.sort === "name-z") {
      tempProducts = tempProducts.sort((a, b) => b.name.localeCompare(a.name));
    }
    return {
      ...state,
      filterred_products: tempProducts,
    };
  }

  if (action.type === UPDATE_FILTERS) {
    let { name, value } = action.payload;

    return {
      ...state,
      filters: {
        ...state.filters,
        [name]: value,
      },
    };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: "",
        category: "all",
        company: "all",
        color: "all",
        price: action.payload,
        shipping: false,
      },
    };
  }

  if (action.type === FILTER_PRODUCTS) {
    const { all_products, filters } = action.payload;
    const { text, category, company, color, price, shipping } = filters;
    let tempProducts = [...all_products]
    if (text !== 'all'){
      tempProducts = tempProducts.filter(product => product.name.toLowerCase().startsWith(text));
    }
    if (category !== 'all'){
      tempProducts = tempProducts.filter(product => product.category === category )
    }

    if (company !== 'all'){
      tempProducts = tempProducts.filter(product => product.company === company )
    }

    if (color !== 'all'){
      tempProducts = tempProducts.filter(product => product.colors.find(c => c === color))
    }
    tempProducts = tempProducts.filter(product => product.price <= price )
    if (shipping){
      tempProducts = tempProducts.filter(product => product.shipping === true )
    }
    return {
      ...state,
      filterred_products: tempProducts
    };
  }
  //return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
