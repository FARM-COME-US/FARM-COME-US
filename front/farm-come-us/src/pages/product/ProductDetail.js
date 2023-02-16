import React, { useState, useEffect, Fragment } from "react";
import classes from "./style/ProductDetail.module.scss";
import Card from "../../components/common/Card";
import { MdShoppingCart } from "react-icons/md";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { productDetail } from "../../utils/api/product-http";
import { useSelector } from "react-redux";
import axios from "axios";

const ProductDetail = () => {
  // const user = useSelector((state) => state.user); // 😀 고쳤음
  const userId = useSelector((state) => state.userSlice.value.memberId);

  const [itemDetail, setItemDetail] = useState({});
  const [amount, setAmount] = useState(1);

  const location = useLocation();
  console.log("로케이션");
  console.log(location);

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

  const orderProduct = async function orderProduct() {
    try {
      const response = await axios({
        method: "post",
        url: process.env.REACT_APP_API_SERVER_URL + "/api/v1/order",
        data: {
          itemId: location.state.item_id,
          memberId: userId,
          oitemCount: amount,
          // orderInfoDtoList: [null],
        },
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

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
    console.log(itemDetail);

    const discountPrice =
      itemDetail.item.itemPrice * (1 - itemDetail.item.itemDiscount / 100);

    let resultPrice = discountPrice * amount;

    const convertedPrice = (price) =>
      price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    const sendCartPageHandler = () => {
      alert("장바구니에 추가되었습니다.");
      return;
      /* 장바구니 추가 로직 */
    };

    return (
      <div className={classes.container}>
        <div className={classes.header}>
          <MdOutlineArrowBackIos
            onClick={() => navigate(-1)}
          ></MdOutlineArrowBackIos>
          <div className={classes.storename}>
            <Link to="/store" state={{ storeId: itemDetail.item.storeId }}>
              {itemDetail.item.storeName}
              <span>스토어</span>
            </Link>
          </div>
        </div>
        <Card className={classes.imagecard}>
          <img src={itemDetail.item.savedPath} alt="상품이미지"></img>
        </Card>
        <div className={classes.productname}>{itemDetail.item.itemName}</div>
        <p className={classes.productscript}>
          {itemDetail.item.itemDescription}
        </p>
        <div className={classes.option}>
          <div className={classes.discountspace}>
            {itemDetail.item.itemDiscount !== 0 ? (
              <Fragment>
                <div className={classes.salepercent}>
                  {itemDetail.item.itemDiscount}%
                </div>
                <div className={classes.originalprice}>
                  {convertedPrice(itemDetail.item.itemPrice)}원
                </div>
              </Fragment>
            ) : null}
          </div>
          <div className={classes.saleprice}>
            {`금액 : ${convertedPrice(discountPrice)} 원`}
          </div>
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
            <MdShoppingCart
              className={classes.carticon}
              onClick={sendCartPageHandler}
            />
          </div>
          <div className={classes.buybutton} onClick={orderProduct}>
            <Link
              to="/payment"
              state={{
                storename: itemDetail.item.storeName,
                productname: itemDetail.item.itemName,
                memberId: userId,
                price: resultPrice,
                amount: amount,
              }}
              className={classes.buybuttonlink}
            >
              <div>구매하기</div>
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
