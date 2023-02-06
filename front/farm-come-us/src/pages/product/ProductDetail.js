import React, { useState } from "react";
import classes from "./style/ProductDetail.module.scss";
import Card from "../../components/common/Card";
import { MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import CartModal from "../../components/product/CartModal";
import { useLocation } from "react-router-dom";

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

  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };

  const location = useLocation();
  /*
  productInfo = {
    liveId: int,
    productId: int,
    storeId: int,
    productName: str,
    productScript: str,
    productOption: int,
    productAmount: int,
    productPrice: int,
    discountRate: int,
  },
  storeInfo = {
    storeName: str,
  }
  */

  const discountPrice =
    location.state.productInfo.productPrice *
    (1 - location.state.productInfo.discountRate / 100);

  return (
    <div className={classes.container}>
      <div className={classes.header}>{location.state.storeInfo.storeName}</div>
      <Card className={classes.imagecard}>
        <img src="https://via.placeholder.com/300" alt="공백"></img>
      </Card>
      <div className={classes.productname}>
        {location.state.productInfo.productName}
      </div>
      <div className={classes.productscript}>
        {location.state.productInfo.productScript}
      </div>
      <div className={classes.option}>
        <div className={classes.discountspace}>
          <div className={classes.salepercent}>
            {location.state.productInfo.discountRate}%
          </div>
          <div className={classes.originalprice}>
            {location.state.productInfo.productPrice}원
          </div>
        </div>
        <div className={classes.saleprice}>{discountPrice}</div>
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
        <div className={classes.secondblock}>{discountPrice * amount}</div>
        <div className={classes.thirdblock}>원</div>
      </div>
      <div className={classes.buttonspace}>
        <div className={classes.cartbutton} onClick={showModal}>
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
