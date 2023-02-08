import classes from "./style/ReceiptCard.module.scss";

const ReceiptCard = (props) => {
  return (
    <div className={classes.card}>
      <div className={classes.imgWrapper}>
        <img className={classes.img} src="" alt="사진이 들어갑니다"></img>
      </div>
      <div className={classes.letters}>
        <div>
          <div className={classes.titleWrapper}>
            <div className={classes.title}>강원도 고랭지 배추</div>
            <div className={classes.unit}>140kg</div>
          </div>
          <div className={classes.store}>고랭강원농장</div>
        </div>
        <div className={classes.cost}>234000원</div>
      </div>
    </div>
  );
};

export default ReceiptCard;
