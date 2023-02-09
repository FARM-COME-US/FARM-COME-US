import { React, useState, useEffect, Fragment } from "react";
import { OpenVidu } from "openvidu-browser";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import classes from "./OvContainer.module.scss";

import UserVideoComponent from "./UserVideoComponent";
import LiveChat from "../../components/broadcast/LiveChat";
import LiveHeader from "../../components/broadcast/LiveHeader";
import LiveInfo from "../../components/broadcast/LiveInfo";
import LiveFooter from "../../components/broadcast/LiveFooter";
import LeaveButton from "../../components/broadcast/LeaveButton";
import LiveProductInfo from "../../components/broadcast/LiveProductInfo";

const OV_SERVER_URL = "http://localhost:5000";
const OV_SERVER_SECRET = "MY_SECRET";

const OvContainer = (props) => {
  const navigate = useNavigate();

  const [OV, setOV] = useState(null);
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);

  const [isMute, setIsMute] = useState(false);

  // 채팅 관련 state
  const [chatMsg, setChatMsg] = useState("");
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    joinSession();
  }, []);

  useEffect(() => {
    if (!session) return;
    return () => {
      leaveSession();
    };
  }, [session]);

  useEffect(() => {
    console.log("====================SUB==================");
    console.log(subscribers);
  }, [subscribers]);

  const handleMainVideoStream = (stream) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  };

  const deleteSubscriber = (streamManager) => {
    console.log("delete sub");
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      setSubscribers((prev) => {
        return prev.filter((item) => item !== streamManager);
      });
    }
  };

  const joinSession = async () => {
    // --- 1) Get an OpenVidu object ---
    const tempOV = new OpenVidu();
    setOV(tempOV);

    // --- 2) Init a session ---
    const mySession = tempOV.initSession();
    setSession(mySession);

    // --- 3) Specify the actions when events take place in the session ---

    // On every new Stream received...
    mySession.on("streamCreated", (event) => {
      // Subscribe to the Stream to receive it. Second parameter is undefined
      // so OpenVidu doesn't create an HTML video by its own
      const subscriber = mySession.subscribe(event.stream, undefined);
      // Update the state with the new subscribers
      setSubscribers((prev) => [...prev, subscriber]);
    });

    // On every Stream destroyed...
    mySession.on("streamDestroyed", (event) => {
      // Remove the stream from 'subscribers' array
      deleteSubscriber(event.stream.streamManager);
    });

    // On every asynchronous exception...
    mySession.on("exception", (exception) => {
      console.warn(exception);
    });

    /* 채팅 이벤트 listener 추가 */
    mySession.on("signal:live-chat", (e) => {
      const sender = JSON.parse(e.from.data).clientData;
      const msg = e.data;
      drawTextList(sender, msg);
    });

    // --- 4) Connect to the session with a valid user token ---
    // Get a token from the OpenVidu deployment
    getToken().then((token) => {
      // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
      // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
      mySession
        .connect(token, { clientData: props.username })
        .then(async (res) => {
          // --- 5) Get your own camera stream ---
          // Obtain the current video device in use
          var devices = await tempOV.getDevices();
          var videoDevices = devices.filter(
            (device) => device.kind === "videoinput"
          );

          // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
          // element: we will manage it on our own) and with the desired properties
          const tempPublisher = await tempOV.initPublisherAsync(undefined, {
            audioSource: undefined, // The source of audio. If undefined default microphone
            videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
            publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
            publishVideo: true, // Whether you want to start publishing with your video enabled or not
            resolution: `${props.width}x${props.height}`, // The resolution of your video
            frameRate: 30, // The frame rate of your video
            insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
            mirror: false, // Whether to mirror your local video or not
          });

          // --- 6) Publish your stream ---
          mySession.publish(tempPublisher);

          var currentVideoDeviceId = tempPublisher.stream
            .getMediaStream()
            .getVideoTracks()[0]
            .getSettings().deviceId;
          var currentVideoDevice = videoDevices.find(
            (device) => device.deviceId === currentVideoDeviceId
          );

          // Set the main video in the page to display our webcam and store our Publisher
          setCurrentVideoDevice(currentVideoDevice);
          setMainStreamManager(tempPublisher);
          setPublisher(tempPublisher);
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
    console.log("===============================================");
    console.log(session);
    if (session) {
      console.log(session);
      session.disconnect();
    }

    // Empty all properties...
    setOV(null);
    setSession(undefined);
    setSubscribers([]);
    setMainStreamManager(undefined);
    setPublisher(undefined);
  };

  const leaveSessionHandler = () => {
    if (!window.confirm("방송을 종료하시겠습니까?")) return;
    leaveSession();
    navigate("/mystore/live", { replace: true });
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
    const mySessionId = await createSession(props.sessionId);
    return await createToken(mySessionId);
  };

  const createSession = async (sessionId) => {
    const response = await axios.post(
      OV_SERVER_URL + "/api/sessions",
      { customSessionId: sessionId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    // const data = JSON.stringify({ customSessionId: sessionId });
    // const response = await axios.post(`${OV_SERVER_URL}/api/sessions`, data, {
    //   headers: {
    //     Authorization: "Basic " + btoa("OPENVIDUAPP:" + OV_SERVER_SECRET),
    //     "Content-Type": "application/json",
    //   },
    // });
    return response.data; // The sessionId
  };

  const createToken = async (sessionId) => {
    const response = await axios.post(
      OV_SERVER_URL + "/api/sessions/" + sessionId + "/connections",
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    // console.log(btoa("OPENVIDUAPP:" + OV_SERVER_SECRET));
    // const data = {};
    // const response = await axios.post(`${OV_SERVER_URL}/connections`, data, {
    //   headers: {
    //     Authorization: "Basic " + btoa("OPENVIDUAPP:" + OV_SERVER_SECRET),
    //     "Content-Type": "application/json",
    //   },
    // });

    return response.data; // The token
  };

  // 실시간 채팅
  const sendChatMsgHandler = (e) => {
    e.preventDefault();
    if (chatMsg.length === 0) return;

    session
      .signal({
        data: chatMsg,
        to: [],
        type: "live-chat",
      })
      .then(() => {
        setChatMsg("");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onTextMsgChangeHandler = (e) => {
    setChatMsg(e.target.value);
  };

  const drawTextList = (sender, msg) => {
    const newChat = { sender: sender, msg: msg };
    setChatList((prev) => [...prev, newChat]);
  };

  const toggleMuteHandler = () => {
    if (isMute) {
      publisher.publishAudio(false);
    } else {
      publisher.publishAudio(false);
    }

    setIsMute((prev) => !prev);
  };

  return (
    <div className={props.className}>
      {session !== undefined && mainStreamManager !== undefined ? (
        <Fragment>
          <div className={classes.ovInfoContainer}>
            <LiveHeader
              className={classes.liveHeader}
              isSubscriber={props.isSubscriber}
              isMute={isMute}
              title={props.liveInfo.title}
              onCameraSwitch={switchCamera}
              onLiveClose={leaveSessionHandler}
              onToggleMute={toggleMuteHandler}
            />
            <LiveInfo
              subCnt={subscribers.length}
              title={props.liveInfo.title}
              stock={props.liveInfo.stock}
              unit={props.liveInfo.unit}
            />
            <LiveChat
              chatList={chatList}
              onTextMsgChangeHandler={onTextMsgChangeHandler}
              onSubmit={sendChatMsgHandler}
              msg={chatMsg}
            />
            <LiveFooter>
              {props.isSubscriber ? (
                <div></div>
              ) : (
                <Fragment>
                  <LiveProductInfo liveInfo={props.liveInfo} />
                  <LeaveButton onClick={leaveSessionHandler} />
                </Fragment>
              )}
            </LiveFooter>
          </div>
          <UserVideoComponent
            className={classes.streamContainer}
            streamManager={mainStreamManager}
          />
        </Fragment>
      ) : null}
    </div>
  );
};

export default OvContainer;
