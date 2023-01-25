import React from "react";
import classes from "./style/SideMenu.module.scss";

const SideMenu = (props) => {
  const isLogin = "";
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
          <div>로그인</div>
        )}
      </div>
      <div>
        <div className={classes.SideMenuItem}></div>

        <div className={classes.SideMenuItem}></div>
        <div className={classes.SideMenuItem}></div>
      </div>

      {isLogin ? <div className={classes.SideMenuItem}></div> : ""}
      {/* 로그아웃버튼 -> 로그인시 렌더링, 아니면 안함. */}
    </div>
  );
};

export default SideMenu;
