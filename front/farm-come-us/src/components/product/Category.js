import React, { useState } from "react";
import CategoryItem from "./CategoryItem";
import SubCategory from "./SubCategory";
import classes from "./style/Category.module.scss";

const Category = (props) => {
  const [categoryNum, setNum] = useState(0);

  const getNum = (num) => {
    setNum(num);
  };

  let list = props.categorylist.map((item) => (
    <CategoryItem
      name={item.categoryName}
      key={item.categoryId}
      getNum={getNum}
    ></CategoryItem>
  ));

  return (
    <div>
      <div className={classes.container}>{list}</div>
      <SubCategory></SubCategory>
    </div>
  );
};

export default Category;
