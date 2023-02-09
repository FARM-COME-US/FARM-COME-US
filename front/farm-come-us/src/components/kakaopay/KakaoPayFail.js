import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const KakaoPayFail = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(navigate("/"), 2000);
  }, []);
  return <div>결제 실패 관리자에게 문의 주세요. (010-1234-1234)</div>;
};

export default KakaoPayFail;
