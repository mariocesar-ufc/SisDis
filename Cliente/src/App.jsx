import { SiHomebridge } from "react-icons/si";
import { MdThermostat, MdBrightness7, MdWaterDrop } from "react-icons/md"
import io from "socket.io-client"
import Display from "./components/Display";
import TemperatureActuator from "./components/TemperatureActuator";
import LuminosityActuator from "./components/LuminosityActuator"
import WaterBoxActuator from "./components/WaterBoxActuator"
import {useState, useEffect} from 'react'

import "./styles/App.css";

const socket = io('http://localhost:8080',  { transports: ['websocket', 'polling', 'flashsocket'] })


function App() 
{
const iconSize = 40
const [temperature, setTemperature] = useState(25)
const [luminosity, setLuminosity] = useState(25)
const [waterLevel, setWaterLevel] = useState(20)

const [isLampOn, setLampOn] = useState(false)
useEffect(() => {
    console.log(isLampOn)

    
}, [isLampOn])
socket.on('connect', () => {
  socket.emit('lamp',isLampOn )


})
  socket.on('temperature', (msg) => {
    console.log(msg)
    var convertedValue = parseFloat(msg).toFixed(2)
    setTemperature(convertedValue)
    socket.emit('lamp',isLampOn )

  })

  socket.on('luminosity', (msg) => {
    console.log(msg)
    var convertedValue = parseFloat(msg).toFixed(2)
    setLuminosity(convertedValue)
    socket.emit('lamp',isLampOn )

  })


  socket.on('waterLevel', (msg) => {
    console.log(msg)
    var convertedValue = parseFloat(msg).toFixed(2)
    setWaterLevel(convertedValue)
    socket.emit('lamp',isLampOn )

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
              value={luminosity}
              color={'#407020'}
            />
            <Display
              icon={<MdWaterDrop size={iconSize} />}
              title={"Nível de água"}
              value={waterLevel}
              color={'#702050'}
            />
            <TemperatureActuator color={'#803090'} />
            <LuminosityActuator color={'#608030'} handler={setLampOn}/>
            <WaterBoxActuator color={'#803060'} />
          </div>
        </div>
      </main>
      <footer>Desenvolvido por @equipe12</footer>
    </div>
  );
}

export default App;
