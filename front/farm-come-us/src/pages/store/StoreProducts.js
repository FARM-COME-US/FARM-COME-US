import React from "react";
import classes from "./style/StoreProducts.module.scss";
import StoreProductList from "../../components/store/StoreProductList";

const ITEM_LIST = [
  {
    liveId: 1,
    productId: 1,
    storeId: 1,
    productName: "강원도 고랭지 배추",
    productScript:
      "당도가 진해 특유의 달콤함을 가진 엔비사과를 만나보세요. 🍎 국내에서 정성껏 재배해 신선함이 살아있는 사과만을 담았답니다. 단단한 과육을 아삭하게 한 입 베어 물면 달달한 과즙이 가득 퍼져요. 깨끗하게 씻어 원물 그대로 먹어도 좋고, 샐러드나 샌드위치에 더해 색다른 요리로 즐겨도 만족스러울 거예요.",
    productOption: 1,
    productAmount: 140,
    productPrice: 14000,
    discountRate: 20,
  },

  {
    liveId: 2,
    productId: 2,
    storeId: 1,
    productName: "봉평 메밀 가루",
    productScript:
      "당도가 진해 특유의 달콤함을 가진 엔비사과를 만나보세요. 🍎 국내에서 정성껏 재배해 신선함이 살아있는 사과만을 담았답니다. 단단한 과육을 아삭하게 한 입 베어 물면 달달한 과즙이 가득 퍼져요. 깨끗하게 씻어 원물 그대로 먹어도 좋고, 샐러드나 샌드위치에 더해 색다른 요리로 즐겨도 만족스러울 거예요.",
    productOption: 1,
    productAmount: 20,
    productPrice: 22000,
    discountRate: 20,
  },

  {
    liveId: 3,
    productId: 2,
    storeId: 1,
    productName: "봉평 메밀 가루",
    productScript:
      "당도가 진해 특유의 달콤함을 가진 엔비사과를 만나보세요. 🍎 국내에서 정성껏 재배해 신선함이 살아있는 사과만을 담았답니다. 단단한 과육을 아삭하게 한 입 베어 물면 달달한 과즙이 가득 퍼져요. 깨끗하게 씻어 원물 그대로 먹어도 좋고, 샐러드나 샌드위치에 더해 색다른 요리로 즐겨도 만족스러울 거예요.",
    productOption: 1,
    productAmount: 20,
    productPrice: 25000,
    discountRate: 20,
  },
];

const StoreProducts = () => {
  return (
    <div className={classes.container}>
      <StoreProductList productList={ITEM_LIST}></StoreProductList>
    </div>
  );
};

export default StoreProducts;
