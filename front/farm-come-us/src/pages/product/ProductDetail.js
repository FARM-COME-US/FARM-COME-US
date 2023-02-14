import React, { useState, useEffect } from "react";
import classes from "./style/ProductDetail.module.scss";
import Card from "../../components/common/Card";
import { MdShoppingCart } from "react-icons/md";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { productDetail } from "../../utils/api/product-http";

const ProductDetail = () => {
  const [itemDetail, setItemDetail] = useState({});
  const [amount, setAmount] = useState(1);

  const location = useLocation();

  useEffect(() => {
    async function getItemDetail() {
      try {
        const itemData = await productDetail(location.state.item_id);
        console.log(itemData);
        setItemDetail(itemData);
      } catch (err) {
        console.log(err);
      }
    }

    getItemDetail();
  }, [location.state.item_id]);

  const navigate = useNavigate();

  const plusAmount = () => {
    setAmount(amount + 1);
  };
  const minusAmount = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };

  if (itemDetail.item) {
    console.log("렌더링 성공");
    console.log(itemDetail);

    const discountPrice =
      itemDetail.item.itemPrice * (1 - itemDetail.item.itemDiscount / 100);

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
            <Link to="/store" state={{ storeId: itemDetail.item.storeId }}>
              {itemDetail.item.storeName}
            </Link>
          </div>
        </div>
        <Card className={classes.imagecard}>
          <img src={itemDetail.item.savedPath} alt="공백"></img>
        </Card>
        <div className={classes.productname}>{itemDetail.item.itemName}</div>
        <div className={classes.productscript}>
          {itemDetail.item.itemDescription}
        </div>
        <div className={classes.option}>
          <div className={classes.discountspace}>
            <div className={classes.salepercent}>
              {itemDetail.item.itemDiscount}%
            </div>
            <div className={classes.originalprice}>
              {convertedPrice(itemDetail.item.itemPrice)}원
            </div>
          </div>
          <div className={classes.saleprice}>
            {convertedPrice(discountPrice)}
          </div>
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
            {convertedPrice(resultPrice)}
          </div>
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
                storename: itemDetail.item.storeName,
                productname: itemDetail.item.itemName,
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
  } else {
    console.log(`렌더링 실패 ${itemDetail.item}`);
  }
};

export default ProductDetail;
