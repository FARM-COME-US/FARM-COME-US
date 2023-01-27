import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import userSlice from "../../reduxStore/userSlice";
import Backdrop from "./Backdrop";
import SideMenuItem from "./SideMenuItem";
import classes from "./style/SideMenu.module.scss";
import { useNavigate } from "react-router-dom";

const SideMenu = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const user = useSelector((state) => state.user.value); // 로그인상태에 따라 화면 재렌더링(유저정보 업데이트)
  const toggleSideMenu = () => {
    setIsOpen(!isOpen);
  }; // 상위 컴포넌트에서 onClick으로 이 함수 발동. 근데 버튼은 헤더에 있음. redux로 관리?
  // 😀 햄버거 버튼 눌러서 redux에서 토글하고, 그걸 sideMenu 컴포넌트에서 useSelect하는걸로?

  const isLogin = user.isLogin; // 일단 간이로 nickname받아오면 로그인된걸로 설정
  const sideMenuItemList = [
    {
      linkTo: "/livestore",
      itemName: "Live 스토어",
      imageName: "liveStoreIcon",
    },
    {
      linkTo: "/store",
      itemName: "스토어",
      imageName: "storeIcon",
    },
    {
      linkTo: "/cart",
      itemName: "장바구니",
      imageName: "cartIcon",
    },
    {
      linkTo: "/mypage",
      itemName: "마이페이지",
      imageName: "mypageIcon",
    },
  ];

  const sideMenuItems = sideMenuItemList.map((item, idx) => (
    <SideMenuItem
      linkTo={item.linkTo}
      imageName={item.imageName}
      itemName={item.itemName}
      key={idx}
      closeSideMenu={setIsOpen}
    />
  ));

  return (
    <div className={`${isOpen ? "open" : "closed"} ${props.className}`}>
      <div>
        {/* 프로필 주황색 칸 */}

        {isLogin ? (
          <div
            className="profileBox"
            onClick={() => {
              setIsOpen(false);
              navigate("/mypage");
            }}
          >
            <div className={classes.circleBox}>
              <img
                className={classes.profileImg}
                src={`img/${isLogin ? user.profileimg : "defaultProfile.png"}`}
                alt="프로필이미지"
              />
            </div>
            <div className={classes.profileTxtBox}>
              <div>{user.nickname}nickname</div>
              <div>{user.email}@naver.com</div>
            </div>
          </div>
        ) : (
          <div
            onClick={() => {
              setIsOpen(false);
              navigate("/login"); //이거 괜찮나? 다른애들은 다 컴포넌트 따로 빼놨는데.. 🙄
            }}
          >
            <div className={classes.profileBox}>
              <div className={classes.circleBox}>
                <img
                  className={classes.profileImg}
                  src={`img/${
                    isLogin ? user.profileimg : "defaultProfile.png"
                  }`}
                  alt="프로필이미지"
                />
              </div>
              <div>로그인</div>
            </div>
          </div>
        )}
      </div>

      <div>
        {sideMenuItems}
        {/* <SideMenuItem linkTo="" imageName="" itemName="" />
        <SideMenuItem linkTo="" imageName="" itemName="" />
        <SideMenuItem linkTo="" imageName="" itemName="" /> */}
      </div>

      {isLogin ? (
        <div
          className={classes.SideMenuItem}
          onClick={() => {
            dispatch(userSlice.actions.logout());
            // 지금은 바로 로그아웃 액션객체 날리지만,
            // 로그아웃 바로 되지 않고, 로그아웃할거냐고 물어보고, 확인 누르면 해야될거같음.
            // 모달용 컴포넌트를 새로 생성하고 "확인" 누르면 해당 dispatch 진행하는방식.
          }}
        ></div>
      ) : (
        ""
      )}
      {/* 로그아웃버튼 -> isLogin true시 렌더링, 아니면 안함. */}

      {isOpen ? <Backdrop /> : ""}
      {/* fixed로 빼놔서 밑에 둠. */}
    </div>
  );
};

export default SideMenu;
