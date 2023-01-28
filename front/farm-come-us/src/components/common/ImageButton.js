import React from "react";
import classes from "./style/ImageButton.module.scss"

const ImageButton = () => {
  return(
    <div className={classes.container}>
      <div className={classes.icon} />
      <div className={classes.text}>text</div>
    </div>
  )
};

export default ImageButton