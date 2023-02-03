import React from "react";
import classes from "./style/CategoryItem.module.scss";
import ImageButton from "../common/ImageButton";

const CategoryItem = (props) => {
  const sendId = () => {
    console.log(props.CategoryId);
    props.getNum(props.CategoryId);
  };

  return (
    <div className={classes.container}>
      <ImageButton text={props.name} onClick={sendId}></ImageButton>
    </div>
  );
};

export default CategoryItem;
