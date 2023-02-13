import React, { useState, useEffect } from "react";
import classes from "./style/ProductItem.module.scss";
import Card from "../common/Card";
import { Link } from "react-router-dom";
import { fetchStoreDetail } from "../../utils/api/store-http";

const ProductItem = (props) => {
  const [storeDetail, setStoreDetail] = useState({});
  const [storeImg, setStoreImg] = useState();

  useEffect(() => {
    async function getStoreDetail() {
      try {
        const storeData = await fetchStoreDetail(props.item.storeId);
        setStoreDetail(storeData.data.store);
        setStoreImg(storeData.data.storeImage);
      } catch (err) {
        console.log(err);
      }
    }

    getStoreDetail();
  }, [props.item.storeId]);

  if (props) {
    const convertedPrice = props.item.itemPrice
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return (
      <li className={`${classes.productItem}`}>
        <Link
          to={`/product-detail`}
          state={{
            item_id: props.item.itemId,
          }}
        >
          <Card className={`${classes.productCard}`}>
            <img src={storeImg} alt="productImg" />
            <div className={`${classes.productInfo}`}>
              <div className={`${classes.productName}`}>
                <div className={classes.text}>{props.item.itemName}</div>
              </div>
              <div className={`${classes.priceInfo}`}>
                <span className={`${classes.discount}`}>
                  {`${props.item.itemDiscount}%`}
                </span>
                <span>{`${convertedPrice}원 / ${props.item.itemStock}상자`}</span>
              </div>
              <div className={`${classes.storeInfo}`}>
                <span className={`${classes.storeName}`}>
                  {storeDetail.storeName}
                </span>
                <span> 스토어</span>
              </div>
            </div>
          </Card>
        </Link>
      </li>
    );
  }
};

export default ProductItem;
