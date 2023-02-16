import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MyReceiptItem from "../../components/mypage/MyReceiptItem";
import StoreLikeItem from "../../components/mypage/StoreLikeItem";
import { fetchFavStores } from "../../utils/api/store-http";
import classes from "./style/MyReceipts.module.scss";

const LikeStores = (props) => {
  const [likeStoresData, setLikeStoresData] = useState([]);
  const memberId = useSelector((state) => {
    return state.userSlice.value.memberId;
  });

  useEffect(() => {
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
