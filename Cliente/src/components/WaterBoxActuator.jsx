import { useState } from "react"

import styles from "../styles/actuator.module.css"
import waterBoxStyles from "../styles/waterActuator.module.css"

const { actuator } = styles
const { slider, sliderContainer, label } = waterBoxStyles

export default function TemperatureActuator({ color }) {

    const [waterLevel, setWaterLevel] = useState(20);

    function onChange(e) {
        setWaterLevel(Number.parseFloat(e.target.value))

        //TODO
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