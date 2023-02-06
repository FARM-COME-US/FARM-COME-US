import React from "react";
import classes from "./style/CategoryItem.module.scss";
import CategoryButton from "./CategoryButton";

const CategoryItem = (props) => {
  const sendId = () => {
    props.getid(props.id);
  };

  return (
    <div className={classes.container} onClick={sendId}>
      <CategoryButton
        className={classes.categoryItem}
        text={props.name}
      ></CategoryButton>
    </div>
  );
};

export default CategoryItem;
