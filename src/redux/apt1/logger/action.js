// import { wsLogger } from "@helpers/websocket/apt1Config";
import socketIOClient from "socket.io-client";
const socket = socketIOClient(process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET);

export const apt1LoggerType = {
  APT1_LOGGER: "APT1_LOGGER",
};

export const WsLogger = () => (dispatch) => {
  socket.on("logger-channel", (message) => {
    console.log(message);
    return dispatch({
      type: apt1LoggerType.APT1_LOGGER,
      payload: {
        data: message,
      },
    });
  });
};

export const WsConnect = () => (dispatch) => {
  socket.on("connect", () => {
    socket.emit("user_connected");
    console.log("connect");
  });
};
