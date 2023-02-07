import { useSelector, useDispatch } from "react-redux";
import userSlice from "../../reduxStore/userSlice";
import menuSlice from "../../reduxStore/menuSlice";
import Backdrop from "./Backdrop";
import SideMenuItem from "./SideMenuItem";
import classes from "./style/SideMenu.module.scss";
import { useNavigate } from "react-router-dom";

const SideMenu = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [isOpen, setIsOpen] = useState(true);
  const user = useSelector((state) => state.userSlice.value); // 로그인상태에 따라 화면 재렌더링(유저정보 업데이트)
  const isOpen = useSelector((state) => state.menuSlice.isOpen);

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

  // closeSideMenu={setIsOpen}
  const sideMenuItems = sideMenuItemList.map((item, idx) => (
    <SideMenuItem
      className="sideMenuItem"
      linkTo={item.linkTo}
      imageName={item.imageName}
      itemName={item.itemName}
      key={idx}
    />
  ));

  return (
    // <div className={`${isOpen ? "open" : "closed"} ${props.className} side`}>
    <div
      className={`${classes.sideMenu} ${
        isOpen ? classes.open : classes.closed
      }`}
    >
      <div>
        {/* 프로필 주황색 칸 */}

        {isLogin ? (
          <div
            className="profileBox"
            onClick={() => {
              dispatch(menuSlice.actions.toggle());
              navigate("/mypage");
            }}
          >
            <div className={classes.circleBox}>
              <img
                className={classes.profileImg}
                src={process.env.PUBLIC_URL + "/img/defaultProfile.png"}
                alt="프로필이미"
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
              dispatch(menuSlice.actions.toggle());
              navigate("/login");
            }}
          >
            <div className={classes.profileBox}>
              <div className={classes.circleBox}>
                <img
                  className={classes.profileImg}
                  src={
                    process.env.PUBLIC_URL +
                    `/img/${isLogin ? user.profileimg : "defaultProfile.png"}`
                  }
                  alt="프로필이미지"
                />
              </div>
              <div>로그인</div>
            </div>
          </div>
        )}
      </div>

      <div className={classes.sideMenuItemsWrapper}>{sideMenuItems}</div>

      {isLogin ? (
        <div
          className={classes.SideMenuItem}
          onClick={() => {
            dispatch(userSlice.actions.logout());
            // 지금은 바로 로그아웃 액션객체 날리지만,
            // 로그아웃 바로 되지 않고, 로그아웃할거냐고 물어보고, 확인 누르면 해야될거같음.
            // 모달용 컴포넌트를 새로 생성하고 "확인" 누르면 해당 dispatch 진행하는방식.
          }}
        >
          <img src="img/logoutIcon.png" alt="로그아웃아이콘" />
          <div>로그아웃</div>
        </div>
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
