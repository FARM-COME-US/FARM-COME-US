import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { userSlice } from "../../reduxStore/userSlice";
import SideMenuItem from "./SIdeMenuItem";
import classes from "./style/SideMenu.module.scss";

const SideMenu = (props) => {
  const user = useSelector((state) => state.user.value); // 로그인상태가 따라 화면 재렌더링
  const isLogin = user.nickname; // 일단 간이로 nickname받아오면 로그인된걸로 설정
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        {/* 프로필 주황색 칸 */}
        <div></div>
        {isLogin ? (
          <div>
            <div>닉네임</div>
            <div>이메일</div>
          </div>
        ) : (
          <div>
            <div>기본 프로필사진</div>
            <div>로그인</div>
          </div>
        )}
      </div>

      <div>
        <SideMenuItem linkTo="" imageName="" itemName="" />
        <SideMenuItem linkTo="" imageName="" itemName="" />
        <SideMenuItem linkTo="" imageName="" itemName="" />
      </div>

      {isLogin ? (
        <div
          className={classes.SideMenuItem}
          onClick={() => {
            dispatch(userSlice.actions.logout());
            // 로그아웃 바로 되지 않고, 로그아웃할거냐고 물어보고, 확인 누르면 해야될거같음.
          }}
        ></div>
      ) : (
        ""
      )}
      {/* 로그아웃버튼 -> 로그인시 렌더링, 아니면 안함. */}
    </div>
  );
};

export default SideMenu;
