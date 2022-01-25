import { SiHomebridge } from "react-icons/si";
import { MdThermostat, MdBrightness7, MdWaterDrop } from "react-icons/md"
import {SocketContext} from './context/socket';

import Display from "./components/Display";
import TemperatureActuator from "./components/TemperatureActuator";
import LuminosityActuator from "./components/LuminosityActuator"
import WaterBoxActuator from "./components/WaterBoxActuator"
import {useState, useEffect, useContext, useCallback} from 'react'

import "./styles/App.css";


function Screen() 
{
  const iconSize = 40
  const socket = useContext(SocketContext);

  
  
  const [temperature, setTemperature] = useState(25)
  const [waterLevel, setWaterLevel] = useState(20)
  const [luminosity, setLuminosity] = useState(20)
  
  const handleTemperatureChange = useCallback((temperatureValue) => {
    var convertedValue = parseFloat(temperatureValue).toFixed(2)
    setTemperature(convertedValue);
  }, []);

  const handleLuminosityChange = useCallback((luminosityValue) => {
    var convertedValue = parseFloat(luminosityValue).toFixed(2)
    setLuminosity(convertedValue);
  }, []);

  const handleWaterLevelChange = useCallback((waterLevelValue) => {
    var convertedValue = parseFloat(waterLevelValue).toFixed(2)
    setWaterLevel(convertedValue);
  }, []);

  

useEffect(() => {

  socket.on('temperature', handleTemperatureChange)
  return () => {
    socket.off('temperature', handleTemperatureChange)
  }
})



useEffect(() => {

  socket.on('waterLevel', handleWaterLevelChange)
  return () => {
    socket.off('waterLevel', handleWaterLevelChange)
  }
})

useEffect(() => {

  socket.on('luminosity', handleLuminosityChange)
  return () => {
    socket.off('luminosity', handleLuminosityChange)
  }
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
            <TemperatureActuator color={'#803090'}/>
            <LuminosityActuator color={'#608030'}/>
            <WaterBoxActuator color={'#803060'}/>
          </div>
        </div>
      </main>
      <footer>Desenvolvido por @equipe12</footer>
    </div>
  );
}

export default Screen;
