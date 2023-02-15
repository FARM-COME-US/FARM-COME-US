import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import classes from "./style/MyStore.module.scss";
import { fetchUpdateStore } from "../../utils/api/store-http";
// import { fetchStoreDetail } from "../../utils/api/store-http";
import axios from "axios";
import userSlice from "../../reduxStore/userSlice";
import MyStoreHeader from "../../components/mystore/MyStoreHeader";

const MyStore = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSlice.value);
  let storeId = useSelector((state) => state.userSlice.store);

  const [memberId, setMemberId] = useState("");
  const [isEditting, setIsEditting] = useState(false);
  const [storeInfo, setStoreInfo] = useState({
    storeId: "",
    storeName: "",
    storeDescription: "",
    storeStreetAddr: "",
    storeZipcode: "",
    storeDetailAddr: "",
    storePhoneNumber: "",
    imgSrc: "",
    savePath: "",
    uploadFile: "",
  });

  const [initStoreInfo, setInitStoreInfo] = useState({
    storeId: "",
    storeName: "",
    storeDescription: "",
    storeStreetAddr: "",
    storeZipcode: "",
    storeDetailAddr: "",
    storePhoneNumber: "",
    imgSrc: "",
    savePath: "",
    uploadFile: "",
  });

  const fetchStoreData = async () => {
    const accessToken = sessionStorage.getItem("accessToken");

    const res = await axios.get(
      `${process.env.REACT_APP_API_SERVER_URL}/api/v1/store/mystore/${user.memberId}`,
      {
        headers: {
          token: accessToken,
        },
      }
    );
    setStoreInfo((prev) => {
      return {
        ...prev,
        ...res.data.store,
        imgSrc: res.data.storeImage.savedPath,
      };
    });
    console.log(res.data);
    return res.data.store;
  };

  useEffect(() => {
    fetchStoreData()
      .then((res) => {
        setStoreInfo((prev) => {
          return { ...prev, res };
        });
        setInitStoreInfo((prev) => {
          return { ...prev, res };
        });
      })
      .catch((err) => {
        console.error(err);
      });
    // dispatch(userSlice.actions.saveStoreInfo()); // 😀
  }, [storeId]);

  const reLoadUserData = async () => {
    const accessToken = sessionStorage.getItem("accessToken");
    const userDataRes = await axios.get("/api/api/v1/member/", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        token: accessToken,
      },
    });
    dispatch(userSlice.actions.login(userDataRes.data.userInfo));
    return userDataRes.data.userInfo.memberId;
  };

  const onChangeInfoHandler = (name, value) => {
    setStoreInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const editInfoHandler = (e) => {
    e.preventDefault();

    const store = {
      memberId: storeInfo.memberId,
      storeDeliveryCost: storeInfo.storeDeliveryCost,
      storeDeliveryFree: storeInfo.storeDeliveryFree,
      storeDescription: storeInfo.storeDescription,
      storeDetailAddr: storeInfo.storeDetailAddr,
      storeId: storeInfo.storeId,
      storeImg: storeInfo.imgSrc,
      storeName: storeInfo.storeName,
      storePhoneNumber: storeInfo.storePhoneNumber,
      storeStreetAddr: storeInfo.storeStreetAddr,
      storeZipcode: storeInfo.storeZipcode,
      uploadFile: storeInfo.uploadFile,
    };
    // axios.put(process.env.REACT_APP_API_SERVER_URL + "/api/v1/store/");

    async function updateStore(store, storeId) {
      try {
        const accessToken = sessionStorage.getItem("accessToken");
        const response = axios({
          method: "put",
          url: `${process.env.REACT_APP_API_SERVER_URL}/api/v1/store/${storeId}`,
          // params: {
          //   storeId: storeId,
          // },
          data: {
            request: store,
          },
          headers: {
            "Content-Type": "application/json",
            // Authorization: "Bearer " + accessToken,
            // Authorization: "Bearer " + accessToken,
            token: accessToken,
          },
        });
        // console.log(store.storeId);
        // console.log(store);

        console.log(response.success);
      } catch (err) {
        console.log(err);
      }
    }

    updateStore(store, store.storeId);

    fetchUpdateStore(store);
    alert("스토어 정보가 수정되었습니다.");
    fetchStoreData(store);
    setIsEditting((prev) => !prev);
  };

  const cancelInfoEditHandler = () => {
    setStoreInfo((prev) => {
      return {
        storeId: initStoreInfo.storeId,
        storeName: initStoreInfo.storeName,
        storeDescription: initStoreInfo.storeDescription,
        storeStreetAddr: initStoreInfo.storeStreetAddr,
        storeZipcode: initStoreInfo.storeZipcode,
        storeDetailAddr: initStoreInfo.storeDetailAddr,
        storePhoneNumber: initStoreInfo.storePhoneNumber,
        imgSrc: initStoreInfo.imgSrc,
      };
    });

    setIsEditting((prev) => !prev);

    alert("수정이 취소되었습니다.");
  };

  const toggleIsEditting = (e) => {
    e.preventDefault();
    setIsEditting((prev) => !prev);
  };

  return (
    <div className={classes.mystore}>
      <MyStoreHeader
        info={storeInfo}
        isEditting={isEditting}
        onStoreInfoChange={onChangeInfoHandler}
      />
      <div className={classes.container}>
        <Outlet
          context={{
            storeInfo,
            isEditting,
            onChangeInfoHandler,
            editInfoHandler,
            cancelInfoEditHandler,
            toggleIsEditting,
          }}
        />
      </div>
    </div>
  );
};

export default MyStore;
