import classes from "./style/StoreLikeItem.module.scss";
import { AiFillHeart } from "react-icons/ai";

const StoreLikeItem = (props) => {
  return (
    <div className={`${classes.card} ${classes.mt}`}>
      <div className={`${classes.imgWrapper}`}>
        <img
          className={classes.img}
          src={process.env.PUBLIC_URL + "/img/cabbage.png"}
        />
      </div>
      <div className={`${classes.colflexbox} ${classes.mt}`}>
        <div className={classes.heart}>
          <AiFillHeart />
        </div>
        <div className={classes.title}>고랭강원농장</div>

        <div className={classes.rowflexbox}>
          <div
            className={`${classes.description} ${classes.fullwidth} `}
          >{`주소${" : "} `}</div>
          <div className={classes.description}>
            강원도 평창군 봉평면 무이리 23-12
          </div>
        </div>
        <div className={classes.description}>{`대표자 : ${"강남자"}`}</div>
        <div
          className={classes.description}
        >{`등록일 : ${"2020. 05. 10"}`}</div>
      </div>
    </div>
  );
};

export default StoreLikeItem;
