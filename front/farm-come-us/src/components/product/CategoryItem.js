import React from "react";
import classes from "./style/CategoryItem.module.scss";
import CategoryButton from "./CategoryButton";

const CategoryItem = (props) => {
  console.log(props);

  const sendId = () => {
    props.getid(props.category_id, 0);
  };

  return (
    <div className={classes.container} onClick={sendId}>
      <CategoryButton
        className={classes.categoryItem}
        category_name={props.category_name}
      ></CategoryButton>
    </div>
  );
};

export default CategoryItem;
