import io from "socket.io-client";

const socket = io.connect("http://15.206.128.209:8000/", {
  query: { token: localStorage.getItem("chat-app-token") },
});

export default socket;
