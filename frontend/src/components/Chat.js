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
import { Box } from "@mui/material";

const Chat = () => {
  const { id, type } = useParams();
  const paperRef = useRef(null);
  const dispatch = useDispatch();
  const chat = useSelector((state) => state.Chats);
  const user_id = useSelector((state) => state.User._id);
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
  socket.off("receiveGroupMessage");
  socket.on("successPrivateMessage", async (payload) => {
    await dispatch(createSuccess("message sent"));
    console.log(payload);
    await dispatch(
      addSingleChat(payload.message)
    );
    if (payload.recent.user1._id == id) {
      await dispatch(
        updateRecents(payload.recent.user1)
      );
    }
    else {
      await dispatch(updateRecents(payload.recent.user2))
    }
    const paper = document.getElementsByClassName("scroller")[0];
    paper.scrollTop = paper.scrollHeight;
  });
  socket.on("errorPrivateMessage", (payload) => {
    dispatch(createError(payload.error));
  });
  socket.on("receivePrivateMessage", async (payload) => {
    if (payload) {
      await dispatch(createSuccess("message received"));
      console.log(payload);
      await dispatch(
        addSingleChat(payload.message)
      );
      if (payload.recent.user1._id == id) {
        await dispatch(
          updateRecents(payload.recent.user1)
        );
      }
      else {
        await dispatch(
          updateRecents(payload.recent.user2)
        );
      }
      const paper = document.getElementsByClassName("scroller")[0];
      paper.scrollTop = paper.scrollHeight;
    }
  });

  socket.on("receiveGroupMessage", async (payload) => {
    if (payload) {
      await dispatch(createSuccess("message received"));
      await dispatch(
        addSingleChat(payload)
      );
      await dispatch(
        updateRecents(payload.group)
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
      if (type == "user") {
        const resp = await axios.get(
          process.env.REACT_APP_API_URL + `/privatemessage/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Response ", resp.data);
        await dispatch(initialiseChat(resp.data.payload));
      }
      else {
        const resp = await axios.get(
          process.env.REACT_APP_API_URL + `/groupmessage/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Response ", resp.data);
        await dispatch(initialiseChat(resp.data.payload));
      }
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
            console.log(e.sender._id, user_id);
            return (
              <div className="singlechat" 
              style={{display:"grid",
              marginLeft: type == "user" ? (e.sender == id ? null : "auto") : (e.sender._id == user_id ? "auto" : null),
              }}>
                <div 
                style={{
                  display: "flex",
                  marginLeft: type == "user" ? (e.sender == id ? null : "auto") : (e.sender._id == user_id ? "auto" : null),
                  }}
                >

               {e.media ? <Box
                  component="img"
                  sx={{
                    height: 233,
                    width: 350,
                    maxHeight: { xs: 233, md: 167 },
                    maxWidth: { xs: 350, md: 250 },
                  }}
                  alt="Error"
                  src={e.media}
                  /> : <></>}
                  </div>
              <div
                
                style={{
                  display: "flex",
                  marginLeft: type == "user" ? (e.sender == id ? null : "auto") : (e.sender._id == user_id ? "auto" : null),
                  }}
              >
               
                <Typography variant="body1" style={{ whiteSpace: "pre-line" }}>
                  {e.message}
                </Typography>
              </div>
                </div>
            );
          })}
      </Paper>
    </div>
  );
};
export default Chat;
