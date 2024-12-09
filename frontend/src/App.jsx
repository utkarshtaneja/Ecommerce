import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Register from "./pages/Register/Register";
import ProductDetails from "./pages/ProductDetail/ProductDetail";
import Login from "./pages/Login/Login";
import Otp from "./pages/Otp/Otp";
import Home from "./pages/Home/Home";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import MyOrders from "./pages/MyOrders/MyOrders";
import Verify from "./pages/Verify/Verify";
import Cart from "./pages/Cart/Cart";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

import StoreContextProvider from "./context/StoreContext";

const stripePromise = loadStripe(
  "pk_test_51Pxo1aRs1w1em1HoM0gjfK4jtRV6QTcMkaQT38w5OhrHjYqFRXYV6pgk1uz4T5LyvdmgOcdLQnKHSboqf1tRdrIz00O4zxUfTb"
);

function App() {
  return (
    <StoreContextProvider>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/order"
            element={
              <Elements stripe={stripePromise}>
                <PlaceOrder />
              </Elements>
            }
          />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/verify" element={<Verify />} />
        </Routes>
        <ToastContainer />
      </div>
      <Footer />
    </StoreContextProvider>
  );
}

export default App;
