import PersonIcon  from "@mui/icons-material/Person";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import "../styles/login.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password,setPassword] = useState("");
  const [visible,setVisible] = useState(0);

  const changeVisiblity = () =>{
    setVisible((prev)=>{return !prev;})
  }

  return (

    <div className="login">
        <h4 className="header1">Login</h4>
        <div className="inputs">
        <PersonIcon fontSize="large" 
      color="primary"
       style={{ paddingTop: "0.9%",marginRight:"2%", marginLeft:"2%" }}/>
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
     <div className="inputs" >

      { visible?<VisibilityIcon   fontSize="large" 
      color="primary"
      style={{ paddingTop: "3%",marginRight:"2%", marginLeft:"2%" }}
      onClick={changeVisiblity}
      />:<VisibilityOffIcon   fontSize="large" 
      color="primary"
      style={{ paddingTop: "3%",marginRight:"2%", marginLeft:"2%" }}
      onClick={changeVisiblity}
      />}
      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        type={visible?"text":"password"}
        color="primary"
        style={{ width: "85%" }}
        onChange={(e) => {
            setPassword(e.target.value);
        }}
        value={password}
        />
        </div >
        <div className="loginButton">
            <Button variant="contained" style={{marginRight:"10%"}}>Login</Button>
            <Button variant="outlined" href="/signup" color="primary" >Signup</Button>
        </div>
        </div>
  );
};

export default Login;
