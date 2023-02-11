import classes from "./style/Loading.module.scss";

const Loading = () => {
  return (
    <div className={classes.loadingBox}>
      <div className={classes.one}></div>
      <div className={classes.two}></div>
      <div className={classes.three}></div>
    </div>
  );
};

export default Loading;
