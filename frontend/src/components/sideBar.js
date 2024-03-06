import React from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Search from "./Search";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRecents, createError } from "../redux/actionCreators";
import "../styles/sidebar.css";

export default function SideBar() {
  const { id } = useParams();
  const recents = useSelector((state) => state.Recents);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    async function Recents() {
      try {
        const resp = await axios.get(
          process.env.REACT_APP_API_URL + "/user/recents",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("chat-app-token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!resp.data.err) {
          const users = resp.data.payload.map((e)=>{
            if(e.gmail)e.type="user";
            else {e.type="group";}
            return e;
          })
          dispatch(addRecents(users));
        } else {
          dispatch(createError(resp.data.error));
        }
      } catch (err) {
        dispatch(createError(err.message));
      }
    }
    Recents();
  }, []);
  return (
    <div
      style={{
        minWidth: "fit-content",
        backgroundColor: "white",
        borderRadius: "1rem",
        marginRight: "1rem",
      }}
    >
      <Search />
      <Paper
      elevation={1}
        style={{
          width: "inherit",
          height:"81%",
          border: "solid 1px whitesmoke",
          borderRadius: "1rem",
          overflowY: "auto",
        }}
      >
        <List disablePadding style={{ width: "inherit" }}>
          {recents.map((e, index) => { console.log(e);
            return (
              
                <ListItem
                  disablePadding
                  key={index}
                  style={{
                    backgroundColor: e._id == id ? "#e9e7e7" : "white",
                    width: "inherit",
                  }}
                >
                  <ListItemButton
                    component="div"
                    onClick={() => {
                      navigate("/chat/" + e._id+"/"+e.type);
                    }}
                  >
                    <Avatar
                      alt={e.name}
                      src="/static/images/avatar/1.jpg"
                      style={{ marginRight: "5%" }}
                    />
                    <ListItemText primary={e.name} />
                  </ListItemButton>
                </ListItem>
               
            );
          })}
        </List>
      </Paper>
    </div>
  );
}
