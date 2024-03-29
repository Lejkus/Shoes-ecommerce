import "./App.scss";
import Navbar from "./components/Navbar";
import ProductsPage from "./pages/ProductsPage";
import { Routes, Route } from "react-router-dom";
import SingleProductPage from "./pages/SingleProductPage";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import CheckoutPage from "./pages/CheckoutPage";
import { useSelector } from "react-redux";

function App() {
  const User = useSelector((state) => state.user);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />}></Route>
        <Route exact path="/shop" element={<ProductsPage />}></Route>
        <Route
          exact
          path="/product/:id"
          element={<SingleProductPage />}
        ></Route>
        <Route exact path="/cart" element={<CartPage />}></Route>
        <Route
          exact
          path="/checkout"
          element={
            User.userInfo.token ? (
              <CheckoutPage token={User.userInfo.token} />
            ) : (
              <LoginPage />
            )
          }
        ></Route>
        <Route
          exact
          path="/login"
          element={
            User.userInfo.token ? (
              <ProfilePage token={User.userInfo.token} />
            ) : (
              <LoginPage />
            )
          }
        ></Route>
        <Route
          exact
          path="/profile"
          element={
            User.userInfo.token ? (
              <ProfilePage token={User.userInfo.token} />
            ) : (
              <LoginPage />
            )
          }
        ></Route>
        <Route path="*" element={<h1>Path not resolved</h1>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
