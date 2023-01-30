import "./App.scss";
import axios from "axios";
import Navbar from "./components/Navbar";
import ProductsPage from "./pages/ProductsPage";
import Filters from "./components/Product/Filters";
import { Routes, Route, Link } from "react-router-dom";
import SingleProductPage from "./pages/SingleProductPage";
import CartPage from "./pages/CartPage";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <div className="product-page">
              <Filters />
              <ProductsPage />
            </div>
          }
        ></Route>
        <Route
          exact
          path="/product/:id"
          element={
           <SingleProductPage/>
          }
        ></Route>
        <Route
          exact
          path="/cart"
          element={
           <CartPage/>
          }
        ></Route>
         <Route path="*" element={<h1>Path not resolved</h1>} />
      </Routes>
    </div>
  );
}

export default App;
