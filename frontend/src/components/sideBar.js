import React from "react";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import "../styles/sidebar.css";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import Search from "./Search";

export default function SideBar({toast}) {
 
  const { id } = useParams();
  const [recents,setRecents] = useState([]);

  useEffect(()=>{
    async function Recents(){ 
    try{
      const resp = await axios.get(process.env.REACT_APP_API_URL+"/user/recents",{
        headers:{
          'Authorization': `Bearer ${localStorage.getItem("chat-app-token")}`,
          'Content-Type':'application/json'
        }
      });
      if(resp.data.message){
        console.log(resp.data);
        setRecents(resp.data.payload);
      }
      else {
        toast.error(resp.data.error);
      }
      
    }
    catch(err){
      toast.error(err.message);
    }
  }
  Recents();
  },[])
  return (
  <div style={{ minWidth: "fit-content", overflowY: "auto",backgroundColor:"white",borderRight:"solid 2px whitesmoke"}}>
    <Search/>
    <Paper
      elevation={3}
      style={{ width: "inherit", overflowY: "auto" }}
    >
      <List disablePadding style={{width:"inherit"}}>
        {recents.map((e, index) => {
          return (
            <ListItem
              disablePadding
              key={index}
              style={{ backgroundColor: e[0] == id ? "#e9e7e7" : "white" , width:"inherit"}}
            >
              <ListItemButton component="a" href={"/chat/" + e[0]}>
                <Avatar
                  alt={e.userName}
                  src="/static/images/avatar/1.jpg"
                  style={{ marginRight: "5%" }}
                />
                <ListItemText primary={e[1]} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Paper>
    </div>
  );
}
