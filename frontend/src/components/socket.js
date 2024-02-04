import io from "socket.io-client";

const socket = io.connect("http://localhost:8000", {
  query: { token: localStorage.getItem("chat-app-token") },
});

export default socket;
