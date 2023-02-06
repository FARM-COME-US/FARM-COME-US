import React from "react";
import CategoryItem from "./CategoryItem";
import classes from "./style/Category.module.scss";

const Category = (props) => {
  let list = props.list.map((item) => (
    <CategoryItem key={item.categoryId} name={item.categoryName}></CategoryItem>
  ));

  return <div className={classes.container}>{list}</div>;
};

export default Category;
