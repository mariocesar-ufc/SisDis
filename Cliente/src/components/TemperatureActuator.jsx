import { useState } from "react"

import styles from "../styles/actuator.module.css"
import temperatureStyles from "../styles/tempActuator.module.css"

const { actuator } = styles
const { label, control } = temperatureStyles

export default function TemperatureActuator(props) {
    const {color, handler} = props
    const [temperature, setTemperature] = useState(0)

    function onChange(e) {
        setTemperature(Number.parseFloat(e.target.value))
    }

    function onClick() {
        handler(temperature)
        console.log(`A temperatura é de ${temperature} graus`)
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