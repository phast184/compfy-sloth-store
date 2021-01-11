import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const {
    filterred_products: products,
    isGridview,
    isListview,
  } = useFilterContext();
  return (
    <>
      {isGridview && <GridView products={products}></GridView>}
      {isListview && <ListView products={products}></ListView>}   
 </>
  );
};

export default ProductList;
