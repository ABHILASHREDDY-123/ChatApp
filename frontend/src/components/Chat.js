import { useParams } from "react-router-dom";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/chat.css";
import Paper from "@mui/material/Paper";
import SendMessage from "./sendMessage";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "./socket";
import axios from "axios";
import Typography from "@mui/material/Typography";

import {
  addSingleChat,
  clearChat,
  createError,
  createSuccess,
  initialiseChat,
  updateRecents,
} from "../redux/actionCreators";

const Chat = () => {
  const { id,type } = useParams();
  const paperRef = useRef(null);
  const dispatch = useDispatch();
  const chat = useSelector((state) => state.Chats);
  const user_id = useSelector((state) => state.User.id);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();
  if (token.length === 0) {
    navigate("/login");
  }
  console.log(chat);
  console.log("Chat : ", id);
  // adding socket events
  socket.off("successPrivateMessage");
  socket.off("errorPrivateMessage");
  socket.off("receivePrivateMessage");
  socket.on("successPrivateMessage", async (payload) => {
    await dispatch(createSuccess("message sent"));
    console.log(payload);
    await dispatch(
      addSingleChat([
        payload.insertId,
        payload.message,
        user_id,
        payload.receiverId,
      ])
    );
    await dispatch(
      updateRecents([payload.receiverId, payload.receiverName, payload.time])
    );
    const paper = document.getElementsByClassName("scroller")[0];
    paper.scrollTop = paper.scrollHeight;
  });
  socket.on("errorPrivateMessage", (payload) => {
    dispatch(createError(payload.error));
  });
  socket.on("receivePrivateMessage", async (payload) => {
    if (payload.senderId == id) {
      await dispatch(createSuccess("message received"));
      await dispatch(
        addSingleChat([payload.insertId, payload.message, id, user_id])
      );
      await dispatch(
        updateRecents([payload.senderId, payload.senderName, payload.time])
      );
      const paper = document.getElementsByClassName("scroller")[0];
      paper.scrollTop = paper.scrollHeight;
    }
  });
  useEffect(() => {
    async function fetchChat() {
      if (!id) {
        dispatch(clearChat());
        return;
      }
      const resp = await axios.get(
        process.env.REACT_APP_API_URL + `/privatemessage/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      await dispatch(initialiseChat(resp.data.payload));
      const paper = document.getElementsByClassName("scroller")[0];
      if (paper) paper.scrollTop = paper.scrollHeight;
    }
    fetchChat();
  }, [id]);
  return (
    <div className="chat">
      <SendMessage receiverId={id} />
      <Paper
        className="scroller"
        ref={paperRef}
        style={{
          width: "100%",
          minWidth: "fit-content",
          overflowY: "auto",
          backgroundColor: "#F5F5F5",
          boxShadow: "none",
        }}
      >
        {chat &&
          chat.map((e) => {
            return (
              <div
                className="singlechat"
                style={{
                  display: "flex",
                  marginLeft: e[2] == id ? null : "auto",
                }}
              >
                <Typography variant="body1" style={{ whiteSpace: "pre-line" }}>
                  {e[1]}
                </Typography>
              </div>
            );
          })}
      </Paper>
    </div>
  );
};
export default Chat;
