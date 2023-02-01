import React, { useState } from "react";
import classes from "./style/ProductDetail.module.scss";
import Card from "../../components/common/Card";
import { MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import CartModal from "../../components/product/CartModal";

const dummydata = {
  storename: "작은 언니네 과수원",
  productname: "저탄소 GAP 정성사과 2.5kg",
  productscript:
    "당도가 진해 특유의 달콤함을 가진 엔비사과를 만나보세요. 🍎 국내에서 정성껏 재배해 신선함이 살아있는 사과만을 담았답니다. 단단한 과육을 아삭하게 한 입 베어 물면 달달한 과즙이 가득 퍼져요. 깨끗하게 씻어 원물 그대로 먹어도 좋고, 샐러드나 샌드위치에 더해 색다른 요리로 즐겨도 만족스러울 거예요.",
  discountrate: 20,
  originalprice: 27000,
  discountprice: 21600,
};

const ProductDetail = () => {
  const [amount, setAmount] = useState(1);

  const plusAmount = () => {
    setAmount(amount + 1);
  };
  const minusAmount = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };
  const customamount = () => {};

  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>{dummydata.storename}</div>
      <Card className={classes.imagecard}>
        <img src="https://via.placeholder.com/300" alt="공백"></img>
      </Card>
      <div className={classes.productname}>{dummydata.productname}</div>
      <div className={classes.productscript}>{dummydata.productscript}</div>
      <div className={classes.option}>
        <div className={classes.discountspace}>
          <div className={classes.salepercent}>{dummydata.discountrate}%</div>
          <div className={classes.originalprice}>
            {dummydata.originalprice}원
          </div>
        </div>
        <div className={classes.saleprice}>{dummydata.discountprice}</div>
        <div className={classes.won}>원</div>
        <div className={classes.selectamount}>
          <div className={classes.firstblock} onClick={minusAmount}>
            -
          </div>
          <div className={classes.secondblock}>{amount}</div>
          <div className={classes.thirdblock} onClick={plusAmount}>
            +
          </div>
        </div>
      </div>
      <div className={classes.finalprice}>
        <div className={classes.firstblock}>총 상품 금액:</div>
        <div className={classes.secondblock}>
          {dummydata.discountprice * amount}
        </div>
        <div className={classes.thirdblock}>원</div>
      </div>
      <div className={classes.buttonspace}>
        <div className={classes.cartbutton} onclick={showModal}>
          <MdShoppingCart className={classes.carticon} />
        </div>
        {modalOpen && <CartModal setModalOpen={setModalOpen} />}
        <div className={classes.buybutton}>
          <Link to="/payment" className={classes.buybuttonlink}>
            구매하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
