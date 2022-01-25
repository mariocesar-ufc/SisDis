import { useState, useEffect, useContext } from "react"

import {SocketContext} from '../context/socket';



import { BsFillLightbulbFill, BsFillLightbulbOffFill } from "react-icons/bs"

import styles from "../styles/actuator.module.css"
import luminosityStyles from "../styles/lumiActuator.module.css"

const { actuator } = styles
const { control } = luminosityStyles

export default function LuminosityActuator(props) {
    const {color} = props
    const [isON, setState] = useState(false)

    const socket = useContext(SocketContext);

    useEffect(() => {
        socket.emit('lamp', isON)
    }, [socket, isON])

    function onClick() {
        setState(!isON);
        //TODO
        console.log(`Estado da lâmpada: ${isON ? 'ligada' : 'delisgada'}`)
    }

    return (
        <div className={actuator} style={{ backgroundColor: color }}>
            <div className={control}>
                {isON ? <BsFillLightbulbFill size={50} /> : <BsFillLightbulbOffFill size={50} />}
                <button onClick={onClick}>{isON ? 'Desligar luzes' : 'Ligar luzes'}</button>
            </div>
        </div>
    )
}