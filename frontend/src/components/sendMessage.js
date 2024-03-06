import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import socket from "./socket";
import { useState,useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "../styles/sendMessage.css";

const SendMessage = (props) => {
  const { id,type } = useParams();
  const [message, setMessage] = useState("");
  const [image,setImage] = useState(null);
  const [filename,setFilename] = useState("");
  const fileInputRef = useRef(null);
  const token = useSelector((state) => state.token);
  const User = useSelector((state) => state.User);
  const Recents = useSelector((state) => state.Recents);
  const { receiverId } = props;

  const handleButtonClick = ()=>{
      fileInputRef.current.click();
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if(file){
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setImage(fileReader.result)
      setFilename(file.name);
    };
    fileReader.readAsArrayBuffer(file);
  }
    // const buffer = fs.ReadFileSync()
    // const formData = new FormData();
    // await formData.append('media', file);
    // await formData.append('originalfilename',file.name)
    // console.log(formData.get('media'));
    // setImage(JSON.stringify(Array.from(formData.entries())));
  }
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
      image,
      originalfilename:filename
    });
  }
  else {
    socket.emit("groupMessage",{
      message,
      token,
      groupId:id,
      image,
      originalfilename:filename
    });
  }
    setMessage("");
    setImage(null);
  };

  if (!id) {
    return <div>{/* <img   style={{objectFit:"fill"}}></img> */}</div>;
  }
  return (
    <div className="messageBox">
      <Button
        variant="image"
        onClick={() => {handleButtonClick()}}
        style={{ paddingTop: "1.34%" }}
      > 
       <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={(e)=>handleImageChange(e)}
      />
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
