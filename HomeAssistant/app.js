
var amqp = require('amqplib/callback_api');
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const http = require('http')
const express = require('express');
const socket = require('socket.io')

const protoTemperature = protoLoader.loadSync('temperature.proto')
const protoPump = protoLoader.loadSync('waterPump.proto')
const protoLamp = protoLoader.loadSync('lamp.proto')

const app = express();
const httpConn = http.createServer(app)
const io = new socket.Server(httpConn, { transports: ['websocket', 'polling', 'flashsocket'] })

httpConn.listen("8080", "localhost", () => {})
const temperatureClient = grpc.loadPackageDefinition(protoTemperature)
const waterPumpClient = grpc.loadPackageDefinition(protoPump)
const lampClient = grpc.loadPackageDefinition(protoLamp)


const clientTemperature = new temperatureClient.TemperatureService('127.0.0.1:50051', grpc.credentials.createInsecure())
const clientWaterPump = new waterPumpClient.WaterPumpService('127.0.0.1:50052', grpc.credentials.createInsecure())
const clientLamp = new lampClient.LampService('127.0.0.1:50053', grpc.credentials.createInsecure())

const TemperatureQueue = 'TEMPERATURA';
const WaterLevelQueue = 'NIVELAGUA';
const LuminosityQueue = 'LUMINOSIDADE'

io.on("connection", (socket) => {
    
    socket.on('lamp', (msg) => {
        console.log(msg)
        let Empty = {}

        if(msg == false){
            console.log("Lampada apagada com sucesso")
            clientLamp.turnLampOff(Empty, (err, res) =>{
                if(!err){
                    console.log("Lampada apagada com sucesso")
                }
            });
        }
        if(msg == true){
            console.log("Lampada apagada com sucesso")
            clientLamp.turnLampOn(Empty, (err, res) =>{
                if(!err){
                    console.log("Lampada acesa com sucesso")
                }
            });
        }
    })

    socket.on('waterLevel', (msg) => {
        
        let Speed = {
            SpeedValue: msg
        }
        console.log(`Velocidade da bomba alterada com sucesso para ${msg}`)
        clientWaterPump.setWaterPumpSpeed(Speed, (err, res) => {
            if(!err){
                console.log(`Velocidade da bomba alterada com sucesso para ${msg}`)
            }
        })
    })

    socket.on('acTemperature', (msg) => {
        console.log(`Temperatura alterada para ${msg} com sucesso`)        
        let Temperature = {
            TemperatureValue: msg
        }
        clientTemperature.setTemperature(Temperature, (err, res) => {
                if(!err){
                    console.log(`Temperatura alterada para ${msg} com sucesso`)
                }
        })
    })
    
amqp.connect('amqp://localhost', function(error, connection) {
    connection.createChannel(function(error, channel) {
        
        channel.assertQueue(TemperatureQueue, {
            durable: false
        });
        channel.assertQueue(WaterLevelQueue, {
            durable: false
        });
        channel.assertQueue(LuminosityQueue, {
            durable: false
        });

        
        channel.prefetch(1);
        channel.consume(TemperatureQueue, function(msg) {
            var secs = msg.content.toString().split('.').length - 1;
            

            console.log(msg.content.toString())

            io.emit('temperature', msg.content.toString())
            channel.ack(msg);

           
        }, {
            noAck: false
        });

        channel.consume(WaterLevelQueue, function(msg) {
            var secs = msg.content.toString().split('.').length - 1;
            console.log(msg.content.toString())

            io.emit('waterLevel', msg.content.toString())
           
                channel.ack(msg);
   
        }, {
            noAck: false
        });

        channel.consume(LuminosityQueue, function(msg) {
            var secs = msg.content.toString().split('.').length - 1;
            let Speed = {
                SpeedValue: 1
            }
           
            io.emit('luminosity', msg.content.toString())
            console.log(msg.content.toString())
           
                channel.ack(msg);
       
        }, {
            noAck: false
        });

    });
});
})