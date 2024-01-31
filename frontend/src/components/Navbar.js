import { useState,useEffect } from "react";
const tokenName = "chat-app-token";
const Navbar = () => {
  const [token, setToken] = useState(localStorage.getItem(tokenName)|"");
  const handleLogout = () => {
    localStorage.removeItem(tokenName);
    setToken("");
  };
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">
          Messanger
        </a>
        {token && token.length>0 ? (
          <button class="navbar-brand"  onClick={handleLogout}>
            SignOut
          </button>
        ) : (
          <a class="navbar-brand" href="/login">
            SignIn
          </a>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
