import React from "react";
import classes from "./style/CategoryItem.module.scss";
import ImageButton from "../common/ImageButton";

const CategoryList = (props) => {
  return (
    <div className={classes.container}>
      <ImageButton text={props.name}></ImageButton>
    </div>
  );
};

export default CategoryList;
