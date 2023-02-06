import React from "react";
import classes from "./style/SubCategoryItem.module.scss";

const SubCategoryItem = (props) => {
  const sendSecondId = () => {
    props.getsecondid(props.id);
  };

  return (
    <div className={classes.container} onClick={sendSecondId}>
      {props.name}
    </div>
  );
};

export default SubCategoryItem;
