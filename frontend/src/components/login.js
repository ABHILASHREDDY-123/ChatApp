import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import TextField from "@mui/material/TextField";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import socket from "./socket";
import { useDispatch } from "react-redux";
import "../styles/login.css";
import {
  addToken,
  addUser,
  createError,
  createSuccess,
} from "../redux/actionCreators";

const Login = () => {
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(0);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const changeVisiblity = () => {
    setVisible((prev) => {
      return !prev;
    });
  };
  const submitHandler = async () => {
    const body = {
      gmail,
      password,
    };
    try {
      const resp = await axios.post(
        process.env.REACT_APP_API_URL + "/auth/login/user",
        body
      );
      if (resp.data.message) {
        localStorage.setItem("chat-app-token", resp.data.token);
        socket.emit("send_user_id", { userId: resp.data.userId });
        localStorage.setItem("chat-app-user-id", resp.data.userId);
        dispatch(addUser(resp.data.user));
        dispatch(addToken(resp.data.token));
        dispatch(createSuccess("Login Success"));
        navigate("/chat");
      } else {
        dispatch(createError(resp.data.error));
      }
    } catch (err) {
      dispatch(createError(err.message));
    }
  };
  return (
    <div className="login">
      <h4 className="header1">Login</h4>
      <div className="inputs">
        <PersonIcon
          fontSize="large"
          color="primary"
          style={{ paddingTop: "3%", marginRight: "2%", marginLeft: "2%" }}
        />
        <TextField
          id="outlined-basic"
          label="gmail"
          variant="outlined"
          color="primary"
          style={{ width: "85%" }}
          onChange={(e) => {
            setGmail(e.target.value);
          }}
          value={gmail}
        />
      </div>
      <div className="inputs">
        {visible ? (
          <VisibilityIcon
            fontSize="large"
            color="primary"
            style={{ paddingTop: "4%", marginRight: "2%", marginLeft: "2%" }}
            onClick={changeVisiblity}
          />
        ) : (
          <VisibilityOffIcon
            fontSize="large"
            color="primary"
            style={{ paddingTop: "4%", marginRight: "2%", marginLeft: "2%" }}
            onClick={changeVisiblity}
          />
        )}
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type={visible ? "text" : "password"}
          color="primary"
          style={{ width: "85%" }}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
      </div>
      <div className="loginButton">
        <Button
          variant="contained"
          style={{ marginRight: "10%" }}
          onClick={submitHandler}
        >
          Login
        </Button>
        <Button variant="outlined" href="/signup" color="primary">
          Signup
        </Button>
      </div>
    </div>
  );
};

export default Login;
