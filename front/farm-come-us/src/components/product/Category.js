import React from "react";
import ImageButton from "../common/ImageButton";
import classes from "./style/Category.module.scss"


// 사용할 common conmponents: imageButton

const Category = () => {
  return(
    <div className={classes.container}>
      <ImageButton />
    </div>
  );
};

export default Category;