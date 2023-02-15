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
      linkTo: "/products",
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
      className={classes.sideMenuItem}
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
            className={classes.profileBox}
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
              <div className={classes.nickname}>{user.nickname}</div>
              <div className={classes.email}>{user.email}</div>
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
      <div className={classes.sideMenuItemsWrapper}>
        <div className={classes.sideMenuUpperWrapper}>{sideMenuItems}</div>

        {isLogin ? (
          <div className={classes.sideMenuBottomWrapper}>
            <div
              className={classes.sideMenuItem}
              onClick={() => {
                dispatch(menuSlice.actions.toggle());
                dispatch(userSlice.actions.logout());
                navigate("/");
              }}
            >
              {/* 상위 컴포넌트에서 prop으로 주는 주소로 들어가게 했음. */}
              <div className={classes.flexWrapper}>
                <div className={classes.imgWrapper}>
                  <img
                    src={process.env.PUBLIC_URL + `/img/logoutIcon.png`}
                    alt={props.imageName}
                    className={classes.iconImg}
                  />
                </div>
                <div className={classes.itemTxt}>로그아웃</div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      {/* 로그아웃버튼 -> isLogin true시 렌더링, 아니면 안함. */}

      {isOpen ? <Backdrop /> : ""}
      {/* fixed로 빼놔서 밑에 둠. */}
    </div>
  );
};

export default SideMenu;
