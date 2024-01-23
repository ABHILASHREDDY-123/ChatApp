import { useParams } from "react-router-dom";
import "../styles/chat.css";
import Paper from "@mui/material/Paper";
import SendMessage from './sendMessage';

const Chat = () => {
  const { id } = useParams();
  const senderId = localStorage.getItem("senderId");
  const chat = [
    {message:"hello",senderId:"123",receiverId:"246"},
    {message:"hello",senderId:"123",receiverId:"246"},
    {message:"hi, text... Hello iam here",senderId:"123",receiverId:"246"},
    {message:"hi, text... Hello iam here",senderId:"123",receiverId:"246"},
    {message:"hi, text... Hello iam here",senderId:"123",receiverId:"246"},
    {message:"hi, text... Hello iam here",senderId:"123",receiverId:"246"},
    {message:"hi, text... Hello iam here",senderId:"123",receiverId:"246"},
    {message:"hi, text... Hello iam here",senderId:"123",receiverId:"246"},
    {message:"hi, text... Hello iam here",senderId:"123",receiverId:"246"},
    {message:"hi, text... Hello iam here",senderId:"123",receiverId:"246"},
    {message:"hi, text... Hello iam here",senderId:"123",receiverId:"246"},
    {message:"hi, text... Hello iam here",senderId:"123",receiverId:"246"},
    {message:"hi, text... Hello iam here",senderId:"123",receiverId:"246"},
    
  ];

  return (
    <div className="chat">
         <SendMessage receiverId={id} senderId/>
      <Paper
        elevation={1}
        style={{ width: "100%", minWidth: "fit-content", overflowY: "auto" }}
      >
         {chat.map((e) => {
            return (
                <>
                <p>{e.message}</p>
                </>
            )
         })}
      </Paper>
     
    </div>
  );
};
export default Chat;
