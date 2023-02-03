import React from "react";
import classes from "./style/CategoryItem.module.scss";
import ImageButton from "../common/ImageButton";

const CategoryItem = (props) => {
  const sendId = () => {
    props.getid(props.id);
  };

  return (
    <div className={classes.container} onClick={sendId}>
      <ImageButton text={props.name}></ImageButton>
    </div>
  );
};

export default CategoryItem;
