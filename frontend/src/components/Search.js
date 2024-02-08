import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AddIcon from "@mui/icons-material/Add";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import axios from "axios";
import "../styles/search.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addMembers,
  createError,
  handleSearchResults,
  updateRecents,
  removeMember
} from "../redux/actionCreators";

const Search = () => {
  const [open, setOpen] = useState(false);
  const [group, setGroup] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.searchResults);
  const [query, setQuery] = useState("");
  const members = useSelector(state => state.members);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = ()=>{
    setGroup(false);
  }
  const handleaddGroup = ()=>{
    setGroup(true);
  }

  const handleCreateGroup = ()=>{

  }

  const handleSearch = async () => {
    try {
      const resp = await axios.get(
        process.env.REACT_APP_API_URL + "/search/" + query,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("chat-app-token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(resp.data.payload);
      const data = resp.data.payload.map((r) => {
        return { id: r[0], name: r[1], gmail: r[2] };
      });
      dispatch(handleSearchResults(data));
    } catch (err) {
      dispatch(createError("No User Found.."));
      dispatch(handleSearchResults([]));
    }
  };

  return (
    <div className="search">
      <div
        className="head"
        style={{
          display: "flex",
          alignContent: "space-around",
          width: "inherit",
        }}
      >
        <div>
          <Button onClick={handleClickOpen}>
            <SearchIcon
              fontSize="large"
              color="primary"
              style={{ marginRight: "2%", marginLeft: "2%", marginTop: "4%" }}
            />
            Search
          </Button>
        </div>
        <div style={{ marginLeft: "40%" }}>
          <Button>
            <AddIcon
              fontSize="large"
              color="primary"
              style={{ marginRight: "2%", marginLeft: "2%", marginTop: "4%" }}
              onClick={handleaddGroup}
            />
          </Button>

        </div>
      </div>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={"sm"}>
        <DialogTitle>Search User</DialogTitle>
        <DialogContent style={{ paddingBottom: "0rem" }}>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="search"
            type="text"
            fullWidth
            variant="outlined"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          <DialogContentText paddingTop={2} paddingBottom={0}>
            Results ({searchResults.length}):
            <List>
              {searchResults &&
                searchResults.map((e, index) => {
                  return (
                    <>
                      <ListItem
                        key={index}
                        disablePadding
                        style={{ cursor: "pointer", width: "inherit" }}
                        onClick={async () => {
                          var t = Date.now();
                          console.log([e.id, e.name, t]);
                          setOpen(false);
                          dispatch(updateRecents([e.id, e.name, t]));
                          navigate("/chat/" + e.id);
                        }}
                      >
                        <ListItemButton style={{ borderRadius: "1rem" }}>
                          <ListItemText
                            primary={"name : " + e.name}
                            secondary={
                              <React.Fragment>
                                <Typography
                                  sx={{ display: "inline" }}
                                  component="span"
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {e.gmail}
                                </Typography>
                              </React.Fragment>
                            }
                          />
                        </ListItemButton>
                      </ListItem>
                      <Divider />
                    </>
                  );
                })}
            </List>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSearch}>Search</Button>
        </DialogActions>
      </Dialog>



       {/* second dialog box for groups */}
      <Dialog open={group} onClose={handleCancel} fullWidth maxWidth={"sm"}>
        <DialogTitle>Search User</DialogTitle>
        <DialogContent style={{ paddingBottom: "0rem" }}>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="search"
            type="text"
            fullWidth
            variant="outlined"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
           <DialogActions>
          <Button onClick={handleSearch}>Search</Button>
          </DialogActions>
          <DialogContentText>
              Members ({members.length}):
            <List style={{display:"flex",flexWrap:"wrap", alignItems:"start"}}>
              {members && members.map((e,index)=>{
                return (
                <>
                <ListItem
                  key={index}
                  disablePadding
                  style={{ cursor: "pointer", width: "inherit" ,backgroundColor:"#EFEFEF",borderRadius:"1rem",marginRight:"0.2rem",marginBottom:"0.2rem"}}
                  onClick={async () => {
                    dispatch(removeMember({id:e.id,name:e.name,gmail:e.gmail}));
                  }}
                  
                >
                  <ListItemButton style={{ borderRadius: "1rem" }}>
                    <ListItemText
                      primary={e.name}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.secondary"
                          >
                            {e.gmail}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </>)
              })}
            </List>
          </DialogContentText>
          <DialogContentText paddingTop={2} paddingBottom={0}>
            Results ({searchResults.length}):
            <List>
              {searchResults &&
                searchResults.map((e, index) => {
                  return (
                    <>
                      <ListItem
                        key={index}
                        disablePadding
                        style={{ cursor: "pointer", width: "inherit" }}
                        onClick={async () => {
                          var t = Date.now();
                          console.log(e);
                          console.log([e.id, e.name, t]);
                          dispatch(addMembers({id:e.id,name:e.name,gmail:e.gmail}));
                        }}
                      >
                        <ListItemButton style={{ borderRadius: "1rem" }}>
                          <ListItemText
                            primary={"name : " + e.name}
                            secondary={
                              <React.Fragment>
                                <Typography
                                  sx={{ display: "inline" }}
                                  component="span"
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {e.gmail}
                                </Typography>
                              </React.Fragment>
                            }
                          />
                        </ListItemButton>
                      </ListItem>
                      <Divider />
                    </>
                  );
                })}
            </List>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleCreateGroup}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default Search;
