import React, { useState, useEffect } from "react";
import classes from "./style/SubCategory.module.scss";
import SubCategoryItem from "./SubCategoryItem";
import { categoryDetail } from "../../utils/api/category-http";

const SubCategory = (props) => {
  const [categoryDetailState, setCategoryDetailState] = useState([]);

  useEffect(() => {
    setCategoryDetailState(categoryDetail());
  }, []);

  const sendSubCategoryId = (id) => {
    props.getSubCategoryId(id);
  };

  let list = [];

  if (categoryDetailState.length > 0) {
    list = props.SUB_CATEGORY_LIST.map((item) => (
      <SubCategoryItem
        sub_category_name={item.category}
        key={item.sub_category_id}
        sub_category_id={item.sub_category_id}
        getSubCategoryId={sendSubCategoryId}
      ></SubCategoryItem>
    ));
  } else {
    console.log(`fail ${categoryDetailState}`);
  }

  return (
    <div>
      {props.category_id > 0 ? (
        <div className={classes.container}>{list}</div>
      ) : null}
    </div>
  );
};

export default SubCategory;
