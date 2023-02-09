import React from "react";
import classes from "./style/SubCategory.module.scss";
import SubCategoryItem from "./SubCategoryItem";

const SubCategory = (props) => {
  const sendSubCategoryId = (id) => {
    props.getSubCategoryId(id);
  };

  let list = props.SUB_CATEGORY_LIST.map((item) => (
    <SubCategoryItem
      sub_category_name={item.sub_category_name}
      sub_category_key={item.sub_category_key}
      sub_category_id={item.sub_category_id}
      getSubCategoryId={sendSubCategoryId}
    ></SubCategoryItem>
  ));

  return (
    <div>
      {props.firstId > 0 ? (
        <div className={classes.container}>{list}</div>
      ) : null}
    </div>
  );
};

export default SubCategory;
