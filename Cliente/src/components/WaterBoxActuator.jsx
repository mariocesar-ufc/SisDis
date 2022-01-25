import { useState, useEffect, useContext } from "react"
import {SocketContext} from '../context/socket';

import styles from "../styles/actuator.module.css"
import waterBoxStyles from "../styles/waterActuator.module.css"

const { actuator } = styles
const { slider, sliderContainer, label } = waterBoxStyles

export default function TemperatureActuator(props) {
    
    const {color} = props
    
    const socket = useContext(SocketContext);

    const [waterLevel, setWaterLevel] = useState(20);

    useEffect(() => {
        socket.emit('waterLevel', waterLevel)
    }, [socket, waterLevel])

    function onChange(e) {
        setWaterLevel(Number.parseFloat(e.target.value))
        console.log(`O nível atual de água é de: ${waterLevel}`)
    }

    return (
        <div className={actuator} style={{ backgroundColor: color }}>
            <p className={label}>Nível de água</p>
            <div className={sliderContainer}>
                <span>Min</span>
                <input
                    type="range"
                    min="0"
                    max="40"
                    value={waterLevel}
                    className={slider}
                    onChange={onChange}
                />
                <span>Max</span>
            </div>
        </div>
    )
}