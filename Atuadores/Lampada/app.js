const grpc = require('grpc')
const lampProto = grpc.load('lamp.proto')
const server = new grpc.Server()

let LAMP_STATUS = false

server.addService(lampProto.LampService.service, {
    turnLampOn :  (call, callback) => {
       LAMP_STATUS = true
       console.log(LAMP_STATUS)
    },
    turnLampOff : (call, callback) => {
        LAMP_STATUS = false
        console.log(LAMP_STATUS)

    }
})

server.bind('127.0.0.1:50053', grpc.ServerCredentials.createInsecure())
console.log('Lampada iniciada')

server.start()