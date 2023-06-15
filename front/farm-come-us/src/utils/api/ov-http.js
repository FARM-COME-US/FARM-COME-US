import axios from "axios";

export async function createLiveSession(sessionId) {
  const data = { customSessionId: sessionId };

  return await axios
    .post(
      process.env.REACT_APP_OPENVIDU_SERVER + "/openvidu/api/sessions",
      data,
      {
        headers: {
          Authorization:
            "Basic " +
            btoa("OPENVIDUAPP:" + process.env.REACT_APP_OPENVIDU_SECRET),
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
    .then((res) => {
      resolve(res.data.sessionId);
    })
    .catch((err) => {
      /* 이미 존재하는 방이면 서버에서 409를 반환 */
      if (err.response.status === 409) {
        resolve(sessionId);
      } else {
        console.error(err);
      }
    });
}

export async function createToken(sessionId) {
  const myRole = props.isPublisher ? "PUBLISHER" : "SUBSCRIBER";
  const data = { role: myRole };

  return await axios
    .post(
      process.env.REACT_APP_OPENVIDU_SERVER +
        `/openvidu/api/sessions/${sessionId}/connection`,
      data,
      {
        headers: {
          Authorization: `Basic ${btoa(
            `OPENVIDUAPP:${process.env.REACT_APP_OPENVIDU_SECRET}`
          )}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      return res.data.token;
    })
    .catch((err) => {
      console.error(err);
    });
}

export function fetchLiveSessions() {
  return axios
    .get(`${process.env.REACT_APP_OPENVIDU_SERVER}/openvidu/api/sessions`, {
      headers: {
        Authorization:
          "Basic " +
          btoa("OPENVIDUAPP:" + process.env.REACT_APP_OPENVIDU_SECRET),
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err);
    });
}

export async function fetchLiveSession(sessionId) {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_OPENVIDU_SERVER}/openvidu/api/sessions/${sessionId}`,
      {
        headers: {
          Authorization:
            "Basic " +
            btoa("OPENVIDUAPP:" + process.env.REACT_APP_OPENVIDU_SECRET),
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    return data;
  } catch (err) {
    if (err.response.status === 404) {
      return null;
    } else {
      console.error(err);
    }
  }
  return null;
}

export async function fetchCloseSession(sessionId) {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_OPENVIDU_SERVER}/openvidu/api/sessions/${sessionId}`,
      {
        headers: {
          Authorization:
            "Basic " +
            btoa("OPENVIDUAPP:" + process.env.REACT_APP_OPENVIDU_SECRET),
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    return response;
  } catch (err) {
    if (err.response.status === 404) {
      console.error(err);
    } else {
      console.error(err);
    }
  }
}
