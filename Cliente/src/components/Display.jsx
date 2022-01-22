import styles from "../styles/display.module.css"

const { display, labelTitle, labelValue, labelUnit } = styles

export default function Display({ color, icon, title, value }) {

    function unit() {
        switch (title) {
            case 'Temperatura':
                return 'graus';

            case 'Luminosidade':
                return 'lux'

            case 'Nível de água':
                return 'm.c.a'

            default:
                break
        }
    }

    return (
        <div className={display} style={{ backgroundColor: color }}>
            {icon}
            <span className={labelTitle}>{title}</span>
            <span className={labelValue}>
                {value}<span className={labelUnit}>{unit()}</span>
            </span>
        </div>
    )
}