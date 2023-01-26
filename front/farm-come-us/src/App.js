import "./App.scss";

import { Routes, Route } from "react-router-dom";
import store from "./reduxStore/store";
import { Provider } from "react-redux";

import Header from "./components/common/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Cart from "./pages/Cart";
import SideMenu from "./components/common/SideMenu";
import { useState } from "react";
import Backdrop from "./components/common/Backdrop";

const App = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div id="app">
      <Provider store={store}>
        <Header>
          <img src="" alt="로고" />

          <button
            type="button"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <img src="img/menubutton.png" alt="" />
          </button>
        </Header>

        {isOpen ? (
          <div>
            {/* <Backdrop /> 사이드바 컨텐츠가 없는거였음. 버그 아님. 클릭했을때 app.js에 영향을 못미쳐서 사이드바만 들어가는거였음. redux통해 관리필요. */}
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
      </Provider>
    </div>
  );
};

export default App;
