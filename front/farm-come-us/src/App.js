import "./App.css";

import { Routes, Route } from "react-router-dom";
import store from "./reduxStore/store";
import { Provider } from "react-redux";

import Header from "./components/common/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Cart from "./pages/Cart";

const App = () => {
  return (
    <div id="app">
      <Provider store={store}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/sign-up" element={<Signup />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
        </Routes>
      </Provider>
    </div>
  );
};

export default App;
