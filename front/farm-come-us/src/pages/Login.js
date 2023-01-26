import React from "react";
import { useDispatch } from "react-redux";
import { asyncSomethingFetch } from "../reduxStore/userSlice";
// 이 함수도 수정 필요 😀 기본형으로 해둠.

function Login() {
  const dispatch = useDispatch();
  return (
    <div>
      <div>로그인 화면입니다.</div>

      <button
        onClick={() => {
          dispatch(asyncSomethingFetch());
        }}
      />
      {/* 로그인버튼. 아직 어떤 인자를 넣어서 비동기 요청 보낼지 안정함. userSlice도 수정필요 */}
    </div>
  );
}

export default Login;
