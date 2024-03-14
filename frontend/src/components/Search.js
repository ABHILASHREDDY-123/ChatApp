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
  const searchResults = useSelector((state) => state.searchResults);
  const Query = useSelector(state => state.Query)
  const members = useSelector(state => state.members);
  const user = useSelector(state => state.User);

  const [open, setOpen] = useState(false);
  const [group, setGroup] = useState(false);
  const [query, setQuery] = useState(Query);
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const GroupSearchResults = searchResults.filter((e)=>{
      return e.type==="user";
  })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setGroup(false);
  }
  const handleaddGroup = () => {
    setGroup(true);
  }

  const handleCreateGroup = async () => {
    let users = []
    console.log(members);
    members.map((e) => { users.push(e._id) })
    // added himself in group
    users.push(user._id)
    // posting the ids of users to create a group...
    await axios.post(process.env.REACT_APP_API_URL + "/group/create", {
      name,
      users
    },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("chat-app-token")}`,
          "Content-Type": "application/json",
        }
      }
    )
    setGroup(false);
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
      const data = resp.data.payload.map((r)=>{
        if(r.gmail){r.type="user";}
        else {r.type="group";}
        return r;
      });
      console.log(data);
      dispatch(handleSearchResults({ searchResults: data, query: query }));
    } catch (err) {
      dispatch(createError("No User Found.."));
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
                  if (e._id !== user._id)
                    return (
                      <>
                        <ListItem
                          key={index}
                          disablePadding
                          style={{ cursor: "pointer", width: "inherit" }}
                          onClick={async () => {
                            if(e.type==="user"){
                            setOpen(false);
                            dispatch(updateRecents(e));
                            navigate("/chat/" + e._id+"/user");
                            }
                            else {
                              setOpen(false);
                              dispatch(updateRecents(e));
                              navigate("/chat/" + e._id+"/group");
                            }
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
                                    {e.gmail?e.gmail:"Type : Group"}
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
            name="group"
            label="Group Name"
            type="text"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            required
            margin="dense"
            id="name"
            name="name"
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
            <List style={{ display: "flex", flexWrap: "wrap", alignItems: "start" }}>
              {members && members.map((e, index) => {
                return (
                  <>
                    <ListItem
                      key={index}
                      disablePadding
                      style={{ cursor: "pointer", width: "inherit", backgroundColor: "#EFEFEF", borderRadius: "1rem", marginRight: "0.2rem", marginBottom: "0.2rem" }}
                      onClick={async () => {
                        dispatch(removeMember({ _id: e._id, name: e.name, gmail: e.gmail }));
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
            Results ({GroupSearchResults.length}):
            <List>
              {GroupSearchResults &&
                GroupSearchResults.map((e, index) => {
                  if (e._id !== user._id)
                    return (
                      <>
                        <ListItem
                          key={index}
                          disablePadding
                          style={{ cursor: "pointer", width: "inherit" }}
                          onClick={async () => {
                            var t = Date.now();
                            console.log(e);
                            dispatch(addMembers(e));
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
