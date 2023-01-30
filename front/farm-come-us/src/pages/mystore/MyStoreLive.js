import React, { useState, useEffect } from "react";
import { OpenVidu } from "openvidu-browser";
import axios from "axios";

import classes from "./style/MyStoreLive.module.scss";

import MyStoreContentTitle from "../../components/mystore/MyStoreContentTItle";
import MyStoreLiveList from "../../components/mystore/MyStoreLiveList";
import AddButton from "../../components/mystore/AddButton";
import AddLiveModal from "../../components/mystore/AddLiveModal";
import UserVideoComponent from "../../utils/UserVideoComponent";

const APPLICATION_SERVER_URL = "http://localhost:5000/";
const DUMMY_LIVE_LIST = [
  {
    liveId: 1,
    liveTitle: "신선한 유기농 강원 고랭 배추",
    productId: 1,
    productName: "강원도 고랭지 배추",
    stock: 140,
    price: 14000,
    unit: 1,
    startDate: new Date(2023, 1, 10, 23, 0, 0),
    imgSrc: "https://via.placeholder.com/300",
  },
  {
    liveId: 2,
    liveTitle: "신선한 유기농 강원 고랭 배추",
    productId: 2,
    productName: "강원도 고랭지 배추",
    stock: 140,
    price: 14000,
    unit: 1,
    startDate: new Date(2023, 0, 30, 6, 0, 0),
    imgSrc: "https://via.placeholder.com/300",
  },
];

const MyStoreLive = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* 세션 관련 states */
  const [OV, setOV] = useState();
  const [session, setSession] = useState();
  const [mainStreamManager, setMainStreamManager] = useState();
  const [publisher, setPublisher] = useState();
  const [subscribers, setSubscribers] = useState([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState();
  const [sessionInfo, setSessionInfo] = useState({
    id: null,
    username: null,
  });

  useEffect(() => {
    if (!sessionInfo.id || !sessionInfo.username) return;
    joinSession();
  }, [sessionInfo.id, sessionInfo.username]);

  useEffect(() => {
    window.addEventListener("beforeunload", onbeforeunload);

    if (!OV) return;
    // --- 2) Init a session ---
    setSession(OV.initSession());

    return () => {
      window.removeEventListener("beforeunload", onbeforeunload);
      leaveSession();
    };
  }, [OV]);

  useEffect(() => {
    if (!session) return;
    connect();

    return () => {
      window.removeEventListener("beforeunload", onbeforeunload);
      leaveSession();
    };
  }, [session]);

  /* 세션 관련 methods */
  const onbeforeunload = (event) => {
    leaveSession();
  };

  const handleMainVideoStream = (stream) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  };

  const deleteSubscriber = (streamManager) => {
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      const newSubscribers = subscribers.filter((item, idx) => idx !== index);
      setSubscribers(newSubscribers);
    }
  };

  const joinSession = () => {
    // --- 1) Get an OpenVidu object ---
    setOV(new OpenVidu());
  };

  const connect = () => {
    // --- 3) Specify the actions when events take place in the session ---
    // On every new Stream received...
    session.on("streamCreated", (event) => {
      // Subscribe to the Stream to receive it. Second parameter is undefined
      // so OpenVidu doesn't create an HTML video by its own
      var subscriber = session.subscribe(event.stream, undefined);
      // Update the state with the new subscribers
      setSubscribers((prev) => [...prev, subscriber]);
    });

    // On every Stream destroyed...
    session.on("streamDestroyed", (event) => {
      // Remove the stream from 'subscribers' array
      deleteSubscriber(event.stream.streamManager);
    });

    // On every asynchronous exception...
    session.on("exception", (exception) => {
      console.warn(exception);
    });

    // --- 4) Connect to the session with a valid user token ---

    // Get a token from the OpenVidu deployment
    getToken().then((token) => {
      // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
      // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
      session
        .connect(token, { clientData: sessionInfo.username })
        .then(async () => {
          // --- 5) Get your own camera stream ---

          // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
          // element: we will manage it on our own) and with the desired properties
          let publisher = await OV.initPublisherAsync(undefined, {
            audioSource: undefined, // The source of audio. If undefined default microphone
            videoSource: undefined, // The source of video. If undefined default webcam
            publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
            publishVideo: true, // Whether you want to start publishing with your video enabled or not
            resolution: "640x480", // The resolution of your video
            frameRate: 30, // The frame rate of your video
            insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
            mirror: false, // Whether to mirror your local video or not
          });

          // --- 6) Publish your stream ---

          session.publish(publisher);

          // Obtain the current video device in use
          var devices = await OV.getDevices();
          var videoDevices = devices.filter(
            (device) => device.kind === "videoinput"
          );
          var currentVideoDeviceId = publisher.stream
            .getMediaStream()
            .getVideoTracks()[0]
            .getSettings().deviceId;
          var currentVideoDevice = videoDevices.find(
            (device) => device.deviceId === currentVideoDeviceId
          );

          // Set the main video in the page to display our webcam and store our Publisher
          setCurrentVideoDevice(currentVideoDevice);
          setMainStreamManager(publisher);
          setPublisher(publisher);
        })
        .catch((error) => {
          console.log(
            "There was an error connecting to the session:",
            error.code,
            error.message
          );
        });
    });
  };

  const leaveSession = () => {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---
    if (session) {
      session.disconnect();
    }

    // Empty all properties...
    setOV(null);
    setSession(undefined);
    setSubscribers([]);
    setMainStreamManager(undefined);
    setPublisher(undefined);
  };

  const switchCamera = async () => {
    try {
      const devices = await OV.getDevices();
      var videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );

      if (videoDevices && videoDevices.length > 1) {
        var newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== currentVideoDevice.deviceId
        );

        if (newVideoDevice.length > 0) {
          // Creating a new publisher with specific videoSource
          // In mobile devices the default and first camera is the front one
          var newPublisher = OV.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });

          //newPublisher.once("accessAllowed", () => {
          await session.unpublish(mainStreamManager);

          await session.publish(newPublisher);

          setCurrentVideoDevice(newVideoDevice[0]);
          setMainStreamManager(newPublisher);
          setPublisher(newPublisher);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getToken = async () => {
    const mySessionId = await createSession(sessionInfo.id);
    return await createToken(mySessionId);
  };

  const createSession = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions",
      { customSessionId: sessionId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The sessionId
  };

  const createToken = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions/" + sessionId + "/connections",
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The token
  };

  /* 기타 메서드 */
  const modalToggleHandler = () => {
    if (!isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }

    setIsModalOpen((prev) => !prev);
  };

  const addLiveHandler = (e) => {
    e.preventDefault();
    alert("라이브 추가 이벤트 발생");

    modalToggleHandler();
    return;
  };

  const startLiveHandler = (liveInfo) => {
    const endDate = new Date(liveInfo.startDate.getTime() + 1 * 60 * 60 * 1000);
    const today = new Date();

    const isLiveEnd = today.getTime() >= endDate.getTime() ? true : false;
    if (isLiveEnd) {
      alert("이미 종료된 라이브입니다.");
    } else {
      const flag = window.confirm("시작?");
      if (!flag) return;

      setSessionInfo({
        id: liveInfo.liveId + "",
        username: "KEVIN",
      });
      // alert("라이브 시작 로직 구현");
    }
    return;
  };

  return (
    <div className={classes.liveContainer}>
      <MyStoreContentTitle text="Live" />
      <MyStoreLiveList
        lives={DUMMY_LIVE_LIST}
        startLiveHandler={startLiveHandler}
      />
      <div className={classes.btnBox}>
        <AddButton className={classes.btnAdd} onClick={modalToggleHandler} />
      </div>

      {session !== undefined ? (
        <div id="session">
          <div id="session-header">
            <h1 id="session-title">{sessionInfo.id}</h1>
            <input
              className="btn btn-large btn-danger"
              type="button"
              id="buttonLeaveSession"
              onClick={leaveSession}
              value="Leave session"
            />
          </div>

          {mainStreamManager !== undefined ? (
            <div id="main-video" className="col-md-6">
              <UserVideoComponent streamManager={mainStreamManager} />
              <input
                className="btn btn-large btn-success"
                type="button"
                id="buttonSwitchCamera"
                onClick={switchCamera}
                value="Switch Camera"
              />
            </div>
          ) : null}
          <div id="video-container" className="col-md-6">
            {publisher !== undefined ? (
              <div
                className="stream-container col-md-6 col-xs-6"
                onClick={() => handleMainVideoStream(publisher)}
              >
                <UserVideoComponent streamManager={publisher} />
              </div>
            ) : null}
            {subscribers.map((sub, i) => (
              <div
                key={i}
                className="stream-container col-md-6 col-xs-6"
                onClick={() => handleMainVideoStream(sub)}
              >
                <UserVideoComponent streamManager={sub} />
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {isModalOpen ? (
        <AddLiveModal
          title="Live 정보 입력"
          className={isModalOpen ? null : "close"}
          onToggleModal={modalToggleHandler}
          onSubmit={addLiveHandler}
          onClick={addLiveHandler}
        />
      ) : null}
    </div>
  );
};

export default MyStoreLive;
