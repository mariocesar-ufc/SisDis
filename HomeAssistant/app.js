
var amqp = require('amqplib/callback_api');
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

const protoTemperature = protoLoader.loadSync('temperature.proto')
const temperatureClient = grpc.loadPackageDefinition(protoTemperature)

const client = new temperatureClient.TemperatureService('127.0.0.1:50051', grpc.credentials.createInsecure())


amqp.connect('amqp://localhost', function(error, connection) {
    connection.createChannel(function(error, channel) {
        var queue1 = 'TEMPERATURE';
        var queue2 = 'HUMIDITY';
        channel.assertQueue(queue1, {
            durable: false
        });
        channel.assertQueue(queue2, {
            durable: false
        });
        channel.prefetch(1);
        channel.consume(queue1, function(msg) {
            var secs = msg.content.toString().split('.').length - 1;

            var meta = new grpc.Metadata();
            meta.add('TemperatureValue', 12)
            let Temperature = {
                TemperatureValue: 1
            }
            client.setTemperature(Temperature, (err, res) => {

            })
            console.log(" [x] Received %s", msg.content.toString());
            setTimeout(function() {
                console.log(" [x] Done");
                channel.ack(msg);
            }, secs * 1000);
        }, {
            noAck: false
        });

        channel.consume(queue2, function(msg) {
            var secs = msg.content.toString().split('.').length - 1;

            console.log(" [x] Received %s", msg.content.toString());
            setTimeout(function() {
                console.log(" [x] Done");
                channel.ack(msg);
            }, secs * 1000);
        }, {
            noAck: false
        });

    });
});