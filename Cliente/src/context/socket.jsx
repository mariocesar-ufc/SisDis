import { connect } from "socket.io-client";
import {createContext} from 'react'

export const SocketContext = createContext();

const SocketProvider = ({children}) => {
     const socket = connect('http://localhost:8080',  { transports: ['websocket', 'polling', 'flashsocket'] });

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider

