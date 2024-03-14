import io from "socket.io-client";

const url = process.env.REACT_APP_API_URL;
const socket = io.connect(url+"/", {
  query: { token: localStorage.getItem("chat-app-token") },
});

export default socket;
