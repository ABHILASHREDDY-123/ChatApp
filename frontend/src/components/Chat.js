import { useParams } from "react-router-dom";
import { useState,useRef } from "react";
import "../styles/chat.css";
import Paper from "@mui/material/Paper";
import SendMessage from './sendMessage';
import { useEffect } from "react";
import socket from "./socket";
import axios from "axios";


const Chat = ({toast}) => {
  const { id } = useParams();
  const user_id = localStorage.getItem('chat-app-user-id');
  const token = localStorage.getItem('chat-app-token');
  const [chat,setChat] = useState([]);
  const paperRef = useRef(null);

  // adding socket events
  socket.off('successPrivateMessage');
  socket.off('errorPrivateMessage');
  socket.off('receivePrivateMessage');
  socket.on('successPrivateMessage',(payload)=>{
      toast.success("message sent");
      console.log("message sent");
      setChat([...chat,[payload.insertId,payload.message,user_id,id]]);
  })
  socket.on('errorPrivateMessage',(payload)=>{
    toast.error(payload.error);
  })
  socket.on('receivePrivateMessage',(payload)=>{
    if(payload.senderId == id){
      toast("message received")
      setChat([...chat,[payload.insertId,payload.message,id,user_id]])
    }
  })
  useEffect(()=>{
       async function fetchChat(){
            if(!id)return;
            const resp = await axios.get(process.env.REACT_APP_API_URL+`/privatemessage/${id}`,{
              headers:{
                'Authorization':`Bearer ${token}`,
                'Content-Type':'application/json'
              }
            })
            toast.success("Messages Loaded...");
            setChat(resp.data.payload);
       }
       fetchChat();
  },[id]) 
  return (
    <div className="chat">
         <SendMessage receiverId={id} token={token}/>
      <Paper
        className="scroller"
        ref = {paperRef}
        elevation={1}
        style={{ width: "100%", minWidth: "fit-content", overflowY: "auto", }}
      >
         {chat.map((e) => {
            return (
                <div className="singlechat" style={{display:'flex',marginLeft:(e[2]==id)?null:"auto"}}>
                <p className='singlechattext'>{e[1]}</p>
                </div>
            )
         })}
      </Paper>
     
    </div>
  );
};
export default Chat;
