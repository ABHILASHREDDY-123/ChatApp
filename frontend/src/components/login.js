import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import TextField from "@mui/material/TextField";
import axios from "axios";
import "../styles/login.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import socket from "./socket";

const Login = ({ toast }) => {
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(0);
  const navigate = useNavigate();
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
        toast.success(resp.data.message, { theme: "dark" });
        socket.emit("send_user_id",{userId:resp.data.user_id})
        localStorage.setItem('chat-app-token',resp.data.token);
        localStorage.setItem('chat-app-user-id',resp.data.user_id);
        navigate("/chat");
      } else {
        toast.error(resp.data.error, { theme: "dark" });
      }
    } catch (err) {
      toast.error(err.message, { theme: "dark" });
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
