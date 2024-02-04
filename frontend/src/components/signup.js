import PersonIcon from "@mui/icons-material/Person";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import "../styles/login.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import Button from "@mui/material/Button";
import axios from "axios";
import { createError, createSuccess } from "../redux/actionCreators";
import { useDispatch } from 'react-redux';

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(0);
  const dispatch = useDispatch();

  const changeVisiblity = () => {
    setVisible((prev) => {
      return !prev;
    });
  };
  const submitHandler = async () => {
    const body = {
      name: userName,
      gmail,
      password,
    };
    try {
      const resp = await axios.post(
        process.env.REACT_APP_API_URL + "/auth/register/user",
        body
      );
      if (resp.data.message) {
        dispatch(createSuccess(resp.data.message));
        dispatch(createSuccess("Thanks for registering..."));
        dispatch(createSuccess("Login now..."));
      } else {
        dispatch(createError(resp.data.error))
      }
    } catch (err) {
      dispatch(createError(err.message));
    }
  };

  return (
    <div className="signup">
      <h4 className="header1">Signup</h4>
      <div className="inputs">
        <PersonIcon
          fontSize="large"
          color="primary"
          style={{ paddingTop: "4%", marginRight: "2%", marginLeft: "2%" }}
        />
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          color="primary"
          style={{ width: "85%" }}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          value={userName}
        />
      </div>
      <div className="inputs">
        <EmailIcon
          fontSize="large"
          color="primary"
          style={{ paddingTop: "4%", marginRight: "2%", marginLeft: "2%" }}
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
          Signup
        </Button>
        <Button variant="outlined" href="/login" color="primary">
          Login
        </Button>
      </div>
    </div>
  );
};

export default Signup;
