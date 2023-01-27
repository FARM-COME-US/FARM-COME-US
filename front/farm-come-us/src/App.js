import "./App.scss";

import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Header from "./components/common/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Cart from "./pages/Cart";
import SideMenu from "./components/common/SideMenu";
import Backdrop from "./components/common/Backdrop";
import menuSlice from "./reduxStore/menuSlice";

const App = () => {
  const menu = useSelector((state) => state.menu.isOpen); // 로그인상태에 따라 화면 재렌더링(유저정보 업데이트)

  return (
    <div id="app">
      <Header />

      {menu ? (
        <div>
          <Backdrop />
          <SideMenu className="sideMenu" />
        </div>
      ) : (
        ""
      )}

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/sign-up" element={<Signup />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
      </Routes>
    </div>
  );
};

export default App;
