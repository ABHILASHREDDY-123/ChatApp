import React from "react";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "../styles/sidebar.css";
import { useParams } from 'react-router-dom';

export default function SideBar() {
  const props = [
    { userName: "Abhilash", userId: "123" },
    { userName: "Tulasi", userId: "243" },
    { userName: "Abhilash", userId: "543" },
    { userName: "Abhilash", userId: "643" },
    { userName: "Abhilash", userId: "743" },
    { userName: "Abhilash", userId: "843" },
    { userName: "Abhilash", userId: "943" },
    { userName: "Abhilash", userId: "1043" },
    { userName: "Abhilash", userId: "153" },
    { userName: "Abhilash", userId: "163" },
    { userName: "Abhilash", userId: "173" },
  ];
  const {id} = useParams();
  return (
    <Paper
      elevation={3}
      style={{ width: "20%", minWidth: "fit-content", overflowY: "auto" }}
    >
      <List disablePadding >
        {props.map((e, index) => {
          return (
            <ListItem
              disablePadding
              key={index}
              style={{ backgroundColor: e.userId == id ? "#969798" : "white" }}
            >
              <ListItemButton component="a" href={e.userId}>
                <Avatar
                  alt={e.userName}
                  src="/static/images/avatar/1.jpg"
                  style={{ marginRight: "5%" }}
                />
                <ListItemText primary={e.userName} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
}
