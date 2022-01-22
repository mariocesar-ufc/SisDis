const grpc = require('grpc')
const temperatureProto = grpc.load('temperature.proto')
const server = new grpc.Server()

let BASE_TEMPERATURE = 25

server.addService(temperatureProto.TemperatureService.service, {
    setTemperature :  (call, callback) => {
        let newTemperatureRequest = call.request
        console.log(`Nova temperatura alterada para ${call.request.TemperatureValue}`)
        if(newTemperatureRequest.TemperatureValue) BASE_TEMPERATURE = newTemperatureRequest.TemperatureValue
    }
})

server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure())
console.log('Ar condicionado iniciado')

server.start()