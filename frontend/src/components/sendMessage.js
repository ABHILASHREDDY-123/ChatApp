import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import socket from "./socket";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "../styles/sendMessage.css";

const SendMessage = (props) => {
  const { id,type } = useParams();
  const [message, setMessage] = useState("");
  const token = useSelector((state) => state.token);
  const User = useSelector((state) => state.User);
  const Recents = useSelector((state) => state.Recents);
  const { receiverId } = props;

  const handleClick = () => {
    let name = "";
    Recents.map((r) => {
      if (r._id == id) {
        name = r.name;
      }
    });
    if(type==="user"){
    socket.emit("privateMessage", {
      message,
      receiverId,
      token,
      senderName: User.name,
      receiverName: name,
    });
  }
  else {
    socket.emit("groupMessage",{
      message,
      token,
      groupId:id
    });
  }
    setMessage("");
  };

  if (!id) {
    return <div>{/* <img   style={{objectFit:"fill"}}></img> */}</div>;
  }
  return (
    <div className="messageBox">
      <Button
        variant="image"
        onClick={() => {}}
        style={{ paddingTop: "1.34%" }}
      >
        <AttachFileIcon fontSize="large" color="primary" />
      </Button>
      <TextField
        id="outlined-basic"
        label="Message"
        variant="outlined"
        color="primary"
        style={{ width: "84%" }}
        multiline
        maxRows={4}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        value={message}
      />
      <Button
        variant="Send"
        onClick={handleClick}
        style={{ paddingTop: "1.34%" }}
      >
        <SendIcon fontSize="large" color="primary" />
      </Button>
    </div>
  );
};
export default SendMessage;
