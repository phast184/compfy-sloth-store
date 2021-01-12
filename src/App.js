import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import {
  Home,
  Cart,
  Error,
  About,
  Products,
  SingleProduct,
  Checkout,
  Private
} from "./pages/index";

function App() {
  return (
    <>
      
      <Router>
      <Navbar />
      <Sidebar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/products">
            <Products />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>

          <Private exact path="/checkout">
            <Checkout />
          </Private>
          <Route exact path="/products/:id" children={<SingleProduct />} />

          <Route exact path="/*">
            <Error />
          </Route>
        </Switch>
        <Footer />
      </Router>
     
    </>
  );
}

export default App;
