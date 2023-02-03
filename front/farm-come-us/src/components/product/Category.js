import React from "react";
import CategoryItem from "./CategoryItem";
import classes from "./style/Category.module.scss";

const Category = (props) => {
  const sendId = (id) => {
    props.getid(id);
  };

  let list = props.list.map((item) => (
    <CategoryItem
      name={item.Name}
      id={item.Id}
      key={item.Id}
      getid={sendId}
    ></CategoryItem>
  ));

  return (
    <div>
      <div className={classes.container}>{list}</div>
    </div>
  );
};

export default Category;
