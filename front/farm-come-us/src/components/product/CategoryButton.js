import React from "react";
import classes from "./style/CategoryButton.module.scss";

const CategoryButton = (props) => {
  return (
    <div className={classes.container}>
      <img src="https://via.placeholder.com/300" alt="productImg" />
      <div className={classes.text}>{props.text}</div>
    </div>
  );
};

export default CategoryButton;
