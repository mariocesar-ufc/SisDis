import { SiHomebridge } from "react-icons/si";
import { MdThermostat, MdBrightness7, MdWaterDrop } from "react-icons/md"
import io from "socket.io-client"
import Display from "./components/Display";
import TemperatureActuator from "./components/TemperatureActuator";
import LuminosityActuator from "./components/LuminosityActuator"
import WaterBoxActuator from "./components/WaterBoxActuator"
import {useState, useEffect, useRef} from 'react'

import "./styles/App.css";

const socket = io('http://localhost:8080',  { transports: ['websocket', 'polling', 'flashsocket'] })


function App() 
{
const iconSize = 40



const [temperature, setTemperature] = useState(25)
const [waterLevel, setWaterLevel] = useState(20)
const luminosity = useRef(25)


const [isLampOn, setLampOn] = useState(false)
const [actualWaterLevel, setActualWaterLevel] = useState(false)
const [AcTemperature, setAcTemperature] = useState(false)

socket.on('temperature', (msg) => {
  console.log(msg)
  var convertedValue = parseFloat(msg).toFixed(2)
  setTemperature(convertedValue)
  socket.off('temperature', () => {})
})


useEffect(() => {
  console.log(isLampOn)
  socket.emit('lamp', isLampOn)
}, [isLampOn])

useEffect(() => {
  console.log(actualWaterLevel)
  socket.emit('waterLevel', actualWaterLevel)

}, [actualWaterLevel])

useEffect(() => {
  console.log(AcTemperature)
  socket.emit('acTemperature', AcTemperature)

}, [AcTemperature])

useEffect(() => {

  socket.on('luminosity', (msg) => {
    console.log(msg)
    var convertedValue = parseFloat(msg).toFixed(2)
    luminosity.current = convertedValue
    console.log('teste')

  })
}, [luminosity])

socket.on('connect', () => {
 

})

  socket.on('temperature', (msg) => {
    

  })



  socket.on('waterLevel', (msg) => {
    console.log(msg)
    var convertedValue = parseFloat(msg).toFixed(2)
    setWaterLevel(convertedValue)

  })



  return (
    <div className="app">
      <header>
        <SiHomebridge size={60} color="#55a09f" />
        <h1>Smart Home</h1>
      </header>
      <main>
        <div className="container">
          <div className="info-panel">
            <Display
              icon={<MdThermostat size={iconSize} />}
              title={"Temperatura"}
              value={temperature}
              color={'#602080'}
            />
            <Display
              icon={<MdBrightness7 size={iconSize} />}
              title={"Luminosidade"}
              value={luminosity.current}
              color={'#407020'}
            />
            <Display
              icon={<MdWaterDrop size={iconSize} />}
              title={"Nível de água"}
              value={waterLevel}
              color={'#702050'}
            />
            <TemperatureActuator color={'#803090'} handler={setAcTemperature}/>
            <LuminosityActuator color={'#608030'} handler={setLampOn}/>
            <WaterBoxActuator color={'#803060'} handler={setActualWaterLevel}/>
          </div>
        </div>
      </main>
      <footer>Desenvolvido por @equipe12</footer>
    </div>
  );
}

export default App;
