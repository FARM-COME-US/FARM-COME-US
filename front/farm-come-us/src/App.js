import "./App.css";

import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/common/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Cart from "./pages/Cart";
import Products from "./pages/product/Products";
import Live from "./pages/live/Live";
import RunningLive from "./pages/live/RunningLive";
import ScheduledLive from "./pages/live/ScheduledLive";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <div id="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/live" element={<Live />}>
          <Route path="running" element={<RunningLive />} />
          <Route path="scheduled" element={<ScheduledLive />} />
          <Route path="" element={<Navigate replace to="running" />} />
        </Route>
        <Route path="/products" element={<Products />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
