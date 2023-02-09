import React from "react";
import classes from "./style/SubCategory.module.scss";
import SubCategoryItem from "./SubCategoryItem";

const SubCategory = (props) => {
  const sendSecondId = (secondid) => {
    props.getsecondid(secondid);
  };

  let list = props.list.map((item) => (
    <SubCategoryItem
      name={item.Name}
      key={item.Id}
      id={item.Id}
      getsecondid={sendSecondId}
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
