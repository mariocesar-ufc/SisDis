
import "./styles/App.css";
import Screen from "./Screen";

import SocketProvider   from "./context/socket";
function App() 
{
 

  return (
      <SocketProvider>
        <Screen/>
      </SocketProvider>
  );
}

export default App;
