import React from "react";
import classes from "./style/SubCategoryItem.module.scss";

const SubCategoryItem = (props) => {
  const sendSubCategoryId = () => {
    props.getSubCategoryId(props.sub_category_id);
  };

  return (
    <div className={classes.container} onClick={sendSubCategoryId}>
      {props.sub_category_name}
    </div>
  );
};

export default SubCategoryItem;
