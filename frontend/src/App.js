import './App.css';
import SideBar from './components/sideBar';
import Chat from './components/Chat';
function App({toast}) {

  return (
    <div className="App">
      <header className="App-header">
         <h1>Chatty App</h1>
      </header>
      <div className='outerBox'>
          <SideBar toast={toast}/>
          <Chat toast={toast}/>
      </div>
    </div>
  );
}

export default App;
