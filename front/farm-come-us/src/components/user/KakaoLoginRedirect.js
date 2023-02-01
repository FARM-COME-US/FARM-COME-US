import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

function KakaoLoginRedirect() {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    localStorage.setItem("kakaotoken", params.token);
    navigate("/");
  }, []);

  return <></>;
}

export default KakaoLoginRedirect;
