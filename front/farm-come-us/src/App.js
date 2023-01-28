import "./App.scss";

import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/common/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Cart from "./pages/Cart";
import SideMenu from "./components/common/SideMenu";
import Backdrop from "./components/common/Backdrop";
import menuSlice from "./reduxStore/menuSlice";
import Products from "./pages/product/Products";
import Live from "./pages/live/Live";
import RunningLive from "./pages/live/RunningLive";
import ScheduledLive from "./pages/live/ScheduledLive";
import NotFound from "./pages/NotFound";

const App = () => {
  const menu = useSelector((state) => state.menu.isOpen); // 로그인상태에 따라 화면 재렌더링(유저정보 업데이트)

  return (
    <div id="app">
      <Header />
      {menu ? (
        <div>
          <Backdrop />
          <SideMenu className="sideMenu open" />
        </div>
      ) : (
        <SideMenu className="sideMenu closed" /> // className이 바뀌는게 아니라 다른className의 컴포넌트가 렌더링되니까 애니메이션 효과가 적용이 안됨. 수정필요
      )}
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
