import { useState, useEffect, useContext } from "react"
import {SocketContext} from '../context/socket';

import styles from "../styles/actuator.module.css"
import temperatureStyles from "../styles/tempActuator.module.css"

const { actuator } = styles
const { label, control } = temperatureStyles

export default function TemperatureActuator(props) {
    const {color} = props
    const [temperature, setTemperature] = useState(0)
    const [targetTemperature, setTargetTemperature] = useState(0)
    const socket = useContext(SocketContext);

    useEffect(() => {
        socket.emit('acTemperature', temperature)
    }, [socket, temperature])


    function onChange(e) {
        setTargetTemperature(Number.parseFloat(e.target.value))
    }

    function onClick() {
        console.log(`A temperatura é de ${temperature} graus`)
        setTemperature(targetTemperature)

    }

    return (
        <div className={actuator} style={{ backgroundColor: color }}>
            <p className={label}>Que temperatura deseja?</p>
            <div className={control}>
                <input type="number" onChange={onChange} />
                <button onClick={onClick}>OK</button>
            </div>
        </div>
    )
}