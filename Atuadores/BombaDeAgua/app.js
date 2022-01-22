const grpc = require('grpc')
const waterPumpProto = grpc.load('waterPump.proto')
const server = new grpc.Server()

let BASE_SPEED = 25

server.addService(waterPumpProto.WaterPumpService.service, {
    setWaterPumpSpeed :  (call, callback) => {
        let newWaterPumpSpeedRequest = call.request
        console.log(`Velocidade da bomba d'agua alterada com sucesso para ${call.request.SpeedValue}`)
        if(newWaterPumpSpeedRequest.SpeedValue) BASE_SPEED = newWaterPumpSpeedRequest.SpeedValue
    }
})

server.bind('127.0.0.1:50052', grpc.ServerCredentials.createInsecure())
console.log('Bomba de agua iniciada')

server.start()