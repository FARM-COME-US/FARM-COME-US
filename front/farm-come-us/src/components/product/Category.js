import React, { useState, useEffect } from "react";
import CategoryItem from "./CategoryItem";
import classes from "./style/Category.module.scss";
import { categoryTitle } from "../../utils/api/category-http";

const Category = (props) => {
  const [categoryTitleState, setCategoryTitleState] = useState([]);

  useEffect(() => {
    const category = categoryTitle();
    console.log(category);
  }, []);

  const sendId = (category_id, sub_category_id) => {
    props.getCategoryId(category_id);
    props.getSubCategoryId(sub_category_id);
  };

  let list = [];

  const getData = () => {
    return categoryTitleState.then((resolvedData) =>
      setCategoryTitleState(resolvedData)
    );
  };

  /*
  if (category !== undefined && category.length > 0) {
    console.log(category);
    list = category.map((item) => (
      <CategoryItem
        category_name={item.categoryName}
        category_id={item.categoryCode}
        key={item.categoryCode}
        getid={sendId}
      ></CategoryItem>
    ));
  } else {
    console.log(`fail ${category}`);
  }
*/
  return (
    <div>
      <div className={classes.container}>{list}</div>
    </div>
  );
};

export default Category;
