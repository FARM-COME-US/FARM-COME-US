import React from "react";
import ImageButton from "../common/ImageButton";
import classes from "./style/Category.module.scss";


const Category = () => {
  return (
    <div className={classes.container}>
      <ImageButton />
      <ImageButton />
      <ImageButton />
      <ImageButton />
    </div>
  );
};

export default Category;