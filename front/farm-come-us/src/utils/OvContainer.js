import { React, useState } from "react";
import { OpenVidu } from "openvidu-browser";
import axios from "axios";

import UserVideoComponent from ".//UserVideoComponent";
import { useEffect } from "react";

const OV_SERVER_URL = "http://localhost:5000/";

const OvContainer = (props) => {
  const [OV, setOV] = useState(null);
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);

  const onbeforeunload = (event) => {
    leaveSession();
    console.log("unload");

    event.returnValue = "";
  };

  useEffect(() => {
    window.addEventListener("beforeunload", onbeforeunload);
    joinSession();
    return () => {
      leaveSession();
      window.removeEventListener("beforeunload", onbeforeunload);
    };
  }, []);

  const handleMainVideoStream = (stream) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  };

  const deleteSubscriber = (streamManager) => {
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      const newSub = subscribers.filter((sub, idx) => idx !== index);
      setSubscribers(newSub);
    }
  };

  const joinSession = async () => {
    // --- 1) Get an OpenVidu object ---
    const tempOV = new OpenVidu();
    setOV(tempOV);

    // --- 2) Init a session ---
    const mySession = await tempOV.initSession();
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
    mySession.on("signal:my-chat", (e) => {
      console.log(e.data);
      console.log(e.from);
      console.log(e.type);
    });

    // --- 4) Connect to the session with a valid user token ---

    // Get a token from the OpenVidu deployment
    getToken().then((token) => {
      // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
      // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
      mySession
        .connect(token, { clientData: props.username })
        .then(async () => {
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
    const mySessionId = await createSession(props.sessionId);
    return await createToken(mySessionId);
  };

  const createSession = async (sessionId) => {
    const response = await axios.post(
      OV_SERVER_URL + "api/sessions",
      { customSessionId: sessionId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The sessionId
  };

  const createToken = async (sessionId) => {
    const response = await axios.post(
      OV_SERVER_URL + "api/sessions/" + sessionId + "/connections",
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The token
  };

  return (
    <div className={props.className}>
      {session !== undefined && mainStreamManager !== undefined ? (
        <div className="">
          <UserVideoComponent streamManager={mainStreamManager} />
          <div id="session-header">
            <div id="session-title">{props.sessionId}</div>
            <div id="session-title">{subscribers.length}</div>
            <input
              className="btn btn-large btn-danger"
              type="button"
              id="buttonLeaveSession"
              onClick={leaveSession}
              value="Leave session"
            />
            <input
              className="btn btn-large btn-success"
              type="button"
              id="buttonSwitchCamera"
              onClick={switchCamera}
              value="Switch Camera"
            />
          </div>
          <div>
            <span>채팅창 목록</span>
            <ul></ul>
            <input type="text" />
            <button
              onClick={() => {
                session
                  .signal({
                    data: "my custom msg",
                    to: [],
                    type: "my-chat",
                  })
                  .then(() => {
                    console.log("메시지 성공적으로 전송");
                  })
                  .catch((err) => {
                    console.error(err);
                  });
              }}
            >
              전송
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default OvContainer;
