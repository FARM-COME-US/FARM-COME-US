import axios from "axios";
import { useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import { MdSearch, MdPhoneIphone } from "react-icons/md";
import classes from "./style/AdditionalInfo.module.scss";

// 수정필요 - 카카오로그인을 하면 모든 필드가 다 주어지지않는데, 회원수정에서 모든걸 required
// ㅈ
const AdditionalInfo = () => {
  const [openModal, setOpenModal] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [streetAddr, setStreetAddr] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [detailAddr, setDetailAddr] = useState("");

  const [isStreetAddr, setIsStreetAddr] = useState(false);
  const [isPhoneNumber, setIsPhoneNumber] = useState(false);

  const onBlurPhoneNumber = (e) => {
    if (e.target.value !== "") {
      setPhoneNumber(e.target.value);
      setIsPhoneNumber(true);
    }
  };
  const onChangestreetAddr = (e) => {
    if (e.target.value !== "") {
      setStreetAddr(e.target.value);
      setIsStreetAddr(true);
    }
  };

  const selectAddress = (data) => {
    console.log(data);
    setIsStreetAddr(true);
    setStreetAddr(data.roadAddress);
    setZipcode(data.zonecode);
    setOpenModal(!openModal);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // 보내는 로직 수정 필요함.
    const data = { phoneNumber, streetAddr, zipcode, detailAddr };
    axios.put("/api/api/v1/member");
  };

  return (
    <form className={classes.container} onSubmit={submitHandler}>
      <div className={classes.headerTxt}>추가정보 입력</div>
      <div className={classes.subcontainer}>
        <div className={classes.formbox}>
          <MdPhoneIphone className={classes.icon} />
          <input
            className={classes.outerInput}
            type="phoneNumber"
            // class="form-control m-input"
            text="전화번호"
            placeholder="전화번호"
            typename="phoneNumber"
            pattern="[0-9]{11}"
            maxLength="13"
            onBlur={onBlurPhoneNumber}
          />
        </div>
        <div className={classes.formbox}>
          <div>
            <MdSearch className={classes.icon} />
            <input
              onFocus={() => {
                setOpenModal(!openModal);
              }}
              onClick={() => {
                setOpenModal(!openModal);
              }}
              className={classes.outerInput}
              onChange={onChangestreetAddr}
              addresstext=" "
              placeholder="주소를 검색해주세요."
              typetitle="streetAddr"
              value={streetAddr}
            />
          </div>
        </div>

        <div className={classes.formbox}>
          <input
            className={classes.outerInput}
            onChange={(e) => setZipcode(e.target.value)}
            passwordtext=" "
            placeholder="우편번호"
            typetitle="zipcode"
            value={zipcode}
          />
        </div>

        <div className={classes.formbox}>
          <input
            className={classes.outerInput}
            onChange={(e) => {
              setDetailAddr(e.target.value);
            }}
            passwordtext=" "
            placeholder="상세주소"
            typetitle="specificstreetAddr"
          />
        </div>

        {/* 이름, 이메일, 패스워드, 패스워드 확인, 주소가 다 맞다면 주황버튼으로 */}
        <button
          className={`${classes.button} ${
            !(isPhoneNumber && isStreetAddr) ? classes.disabled : ""
          }`}
          type="submit"
          disabled={!(isPhoneNumber && isStreetAddr)}
        >
          다음
        </button>
      </div>

      {openModal && (
        <div className={`${classes.modal} ${classes.openModal}`}>
          <DaumPostcodeEmbed
            onComplete={selectAddress} // 값을 선택할 경우 실행되는 이벤트
            autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
            defaultQuery="동서대로 98-39" // 팝업을 열때 기본적으로 입력되는 검색어. 대전캠주소 해놨음.
          />
        </div>
      )}
      {openModal && (
        <div
          className={classes.backdrop}
          onClick={() => {
            setOpenModal(false);
          }}
        />
      )}
    </form>
  );
};

export default AdditionalInfo;
