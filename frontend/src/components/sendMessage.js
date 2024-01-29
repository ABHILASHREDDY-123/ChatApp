import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import socket from "./socket";
import { useState } from "react";
const SendMessage = (props) => {
  const [message, setMessage] = useState("");
  const { receiverId, token} = props;
  const handleClick = () => {
    socket.emit("privateMessage", { message, receiverId,token });
    setMessage("");
  };
  return (
    <div className="messageBox">
      <Button
        variant="image"
        onClick={handleClick}
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
