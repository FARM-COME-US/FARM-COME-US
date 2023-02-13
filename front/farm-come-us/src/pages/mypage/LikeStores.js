import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MyReceiptItem from "../../components/mypage/MyReceiptItem";
import StoreLikeItem from "../../components/mypage/StoreLikeItem";
import { fetchFavStores } from "../../utils/api/store-http";
import classes from "./style/MyReceipts.module.scss";

const LikeStores = (props) => {
  // const [myReceiptsInfoArr, setReceiptsInfoArr] = useState("");
  // receiptsInfoArr가 list형태의 객체들로 들어올것이고, [obj1, obj2... 이렇게.]
  // item1 = { id:orderId, items:[강원도배추, 제즈스윗당근], cost:429,000, orderdate:2023.01.10 21:12:58, }
  let data = [
    {
      id: 1,
      img_address: "/img/cabbage.png",
      isLike: true,
      title: "고랭강원농장",
      address: "강원도 평창군 봉평면 무이리 23-12",
      representative: "강남자",
      created: "2020. 05. 10",
    },
    {
      id: 2,
      img_address: "/img/cabbage.png",
      isLike: true,
      title: "경주우리농장",
      address: "강원도 평창군 봉평면 무이리 23-12",
      representative: "강남자",
      created: "2020. 05. 11",
    },
  ];

  const [likeStoresData, setLikeStoresData] = useState([]);
  const memberId = useSelector((state) => {
    console.log("asd");
    console.log(state.userSlice.value.memberId);
    return state.userSlice.value.memberId;
  });

  useEffect(() => {
    console.log(memberId);
    try {
      const res = fetchFavStores(memberId);
      setLikeStoresData(res.data);
    } catch (err) {
      // console.log(err);
    }
  }, []);
  console.log(memberId);
  // const res = fetchFavStores(memberId);

  let list = <span className={classes.noItem}>찜한 스토어가 없습니다.</span>;

  // BE와 데이터 통신 이후에 살릴 구문 😀
  // if (myReceiptsInfoArr.length > 0) {
  //   list = props.myReceipts.map((item) => (
  //     <MyReceiptItem key={item.id} info={item} />
  //   ));
  // }

  // list = <MyReceiptItem />;
  if (likeStoresData) {
    list = likeStoresData.map((item) => (
      <StoreLikeItem
        key={item.id}
        img_address={item.storeImg}
        isLike={item.isLike}
        title={item.storeName}
        address={item.address}
        representative={item.memberName}
        id={item.id}
        memberId={memberId}
        storeId={item.storeId}
        // created={item.created}
      />
    ));
  }

  return (
    <div>
      <div className={classes.header}>찜한 스토어</div>
      <hr />
      <div
        className={`${classes.flexbox} ${classes.mt} ${classes.screen} ${
          list.length ? "" : classes.centerAlignWrapper
        }`}
      >
        {list}
      </div>
    </div>
  );
};

export default LikeStores;
