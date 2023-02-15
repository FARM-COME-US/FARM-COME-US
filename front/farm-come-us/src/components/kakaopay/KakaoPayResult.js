import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import classes from "./KakaoPayResult.module.scss";

const KakaoPayResult = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userSlice);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  const pgToken = new URL(window.location.href).searchParams.get("pg_token");
  const tid = localStorage.getItem("tid");
  const postCompleted = useEffect(() => {
    axios
      .post(
        "/credit/KakaoPay/completed",
        JSON.stringify({
          cid: "TC0ONETIME",
          partner_order_id: user.username, //암호화 백엔드에서
          partner_user_id: user.username, // 암호화 백엔드에서
          pg_token: pgToken,
          tid: tid,
        }),
        config
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          alert("결제가 완료되었습니다.");
          // navigate("/");
          setTimeout(navigate(`receipt/${tid}`), 3000);
        }
      })
      .catch((error) => {
        // 예외처리 추가 예정
        console.log(error);
      });
  }, []);

  return (
    <div className={classes.screen}>
      결제가 완료되었습니다. 영수증 페이지로 이동합니다.
    </div>
  );
};
export default KakaoPayResult;
