import "./App.scss";

import { Routes, Route } from "react-router-dom";
import store from "./reduxStore/store";
import { useSelector, Provider, useDispatch } from "react-redux";

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
  const dispatch = useDispatch();

  return (
    <div id="app">
      <Header>
        <img src="" alt="로고" />

        <button
          type="button"
          onClick={() => {
            dispatch(menuSlice.actions.toggle());
          }}
        >
          <img src="img/menubutton.png" alt="메뉴버튼" />
        </button>
      </Header>

      {menu ? (
        <div>
          <Backdrop /> 사이드바 컨텐츠가 없는거였음. 버그 아님. 클릭했을때
          app.js에 영향을 못미쳐서 사이드바만 들어가는거였음. redux통해
          관리필요.
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
