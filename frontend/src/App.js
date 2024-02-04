import "./App.css";
import SideBar from "./components/sideBar";
import Chat from "./components/Chat";
import { memo } from "react";
const App = memo(() => {
  return (
    <div className="App">
      <div className="outerBox">
        <SideBar />
        <Chat />
      </div>
    </div>
  );
});

export default App;
