import { useState } from "react"
import { BsFillLightbulbFill, BsFillLightbulbOffFill } from "react-icons/bs"

import styles from "../styles/actuator.module.css"
import luminosityStyles from "../styles/lumiActuator.module.css"

const { actuator } = styles
const { control } = luminosityStyles

export default function LuminosityActuator(props) {
    const {color, handler} = props
    const [isON, setState] = useState(false)

    function onClick() {
        handler(!isON)
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