# 01-16

- FE 주소찾기 시험구현 - 선택 후, data 제대로 받아오는것 확인완료.

- OAuth2.0 학습

- FE 카카오 소셜로그인 학습, 시험구현

- 성유지 코치님 특강으로 mattermost 활용법 습득

- JIRA 사용방법 익숙해짐

- 컨설턴트님 조회시간에 log library 에 대해 알게됨. 사용법 학습.

- OS - 프로세스동기화, deadlock 학습

```js
카카오 주소찾기 시험구현코드
적용위해 UI관련 커스텀 필요, 우리 디자인에 맞게 색상조정필요.
받아온 주소 백엔드에 post 요청하는 추가코드 필요.


import DaumPostcode from "react-daum-postcode";
import { useState } from "react";

function Postcode(props) {
  const [openPostcode, setOpenPostcode] = useState(false);
  // 기본값이 false임.
  // useState의 변수값은 openPostcode
  // 변수의 set함수는 setOpenPostcode
  // 변수의 set함수는 콜백함수를 param으로 받는데,
  // 해당 콜백함수는 이전(openPostcode로 지정된/ 변수이름이 뭐든 no 상관)값을 받아서,
  // 로직처리 이후 return값을 반환한다.
  // 여기서 callback의 return값(콜백함수 말고 정적인자를 써도 됨)이 새로운 openPostcode의 값이 됨.

  function clickEmptyPostbar() {
    setOpenPostcode((current) => !current);
  }
  // current를 받아서 반대로 토글값을 return해주는 콜백함수.
  // setOpenPostcode를 토글로 실행시켜서 openPostcode를 false/true 토글해줌.

  function selectAddress(data) {
    console.log(`
        주소: ${data.address}
        우편번호: ${data.zonecode}
        `); // 일단 콘솔에 찍는걸로 해놨음. 상세주소까지 받아서 DB에 보내야함.
        console.log(data);
    setOpenPostcode(false);
  }

  return (
    <div>
      <button onClick={clickEmptyPostbar}>toggle</button>

      {openPostcode && (
        <DaumPostcode
          onComplete={selectAddress} // 값을 선택할 경우 실행되는 이벤트
          autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
          defaultQuery="동서대로 98-39" // 팝업을 열때 기본적으로 입력되는 검색어. 대전캠주소 해놨음.
        />
      )}
    </div>
  );
}

export default Postcode;
```

<img title="" src="./resources/img/kakao_postcode_response.png" alt="loading-ag-122" width="393">

---

# 01-17

- Redux 학습

- 비동기 요청 async await 복습 with React

- OAuth2.0 학습내용 팀노트에 공유. 이후 SNS이용한 회원가입, 인증으로 이어질 예정.

- 컨설턴트님 아침조회시간에 텔넷을 이용한 네트워크 작동확인방법을 배움.

- 컨설턴트님 아침조회시간에 curl 명령에 대해 배움

- 특강통해 React에서 차트만들어서 관리하는 방법 배움. (MUI의 DataGrid library 사용)

- 개념적 데이터모델링 검토, BE에서 설명해준 데이터 흐름 이해
