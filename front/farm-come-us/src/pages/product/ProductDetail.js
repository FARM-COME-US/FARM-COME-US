import React, { useState } from "react";
import classes from "./style/ProductDetail.module.scss";
import Card from "../../components/common/Card";
import { MdShoppingCart } from "react-icons/md";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

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
    location.state.productInfo.price *
    (1 - location.state.productInfo.discount / 100);

  let resultPrice = discountPrice * amount;

  const convertedPrice = (price) =>
    price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <MdOutlineArrowBackIos
          onClick={() => navigate(-1)}
        ></MdOutlineArrowBackIos>
        <div className={classes.storename}>
          <Link
            to="/store"
            state={{ storeId: location.state.productInfo.storeId }}
          >
            {location.state.productInfo.storeName}
          </Link>
        </div>
      </div>
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
            {location.state.productInfo.discount}%
          </div>
          <div className={classes.originalprice}>
            {convertedPrice(location.state.productInfo.price)}원
          </div>
        </div>
        <div className={classes.saleprice}>{convertedPrice(discountPrice)}</div>
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
        <div className={classes.secondblock}>{convertedPrice(resultPrice)}</div>
        <div className={classes.thirdblock}>원</div>
      </div>
      <div className={classes.buttonspace}>
        <div className={classes.cartbutton}>
          <MdShoppingCart className={classes.carticon} />
        </div>
        <div className={classes.buybutton}>
          <Link
            to="/payment"
            state={{
              storename: location.state.productInfo.storeName,
              productname: location.state.productInfo.productName,
              price: resultPrice,
              amount: amount,
            }}
            className={classes.buybuttonlink}
          >
            구매하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
