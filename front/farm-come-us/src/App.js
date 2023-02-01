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

import ProductDetail from "./pages/product/ProductDetail";
import Payment from "./pages/product/Payment";

import Live from "./pages/live/Live";
import RunningLive from "./pages/live/RunningLive";
import ScheduledLive from "./pages/live/ScheduledLive";
import NotFound from "./pages/NotFound";
import MyStore from "./pages/mystore/MyStore";
import MyStoreInfo from "./pages/mystore/MyStoreInfo";
import MyStoreLive from "./pages/mystore/MyStoreLive";
import MyStoreProducts from "./pages/mystore/MyStoreProducts";
import MyStoreReceipt from "./pages/mystore/MyStoreReceipt";
import BroadCast from "./pages/BroadCast";

import Store from "./pages/store/Store";
import StoreLive from "./pages/store/StoreLive";
import StoreProducts from "./pages/store/StoreProducts";

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
        <Route path="/product-detail" element={<ProductDetail />}></Route>
        <Route path="/payment" element={<Payment />}></Route>
        <Route path="/store" element={<Store />}>
          <Route path="live" element={<StoreLive />}></Route>
          <Route path="products" element={<StoreProducts />}></Route>
        </Route>
        {/* 스토어페이지 렌더링용. */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/livestore" element={<Live />}>
          <Route path="running" element={<RunningLive />} />
          <Route path="scheduled" element={<ScheduledLive />} />
          <Route path="" element={<Navigate replace to="running" />} />
        </Route>
        <Route path="/products" element={<Products />} />
        {/* 마이스토어 생성을 안했으면 prompt 창 띄우고 마이페이지로 리다이렉션 */}
        <Route path="/mystore" element={<MyStore />}>
          <Route path="info" element={<MyStoreInfo />} />
          <Route path="live" element={<MyStoreLive />} />
          <Route path="product" element={<MyStoreProducts />} />
          <Route path="receipt" element={<MyStoreReceipt />} />
          <Route path="" element={<Navigate replace to="info" />} />
        </Route>
        <Route path="/broadcast" element={<BroadCast />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
