
var amqp = require('amqplib/callback_api');

const QUEUE = 'TEMPERATURA'
const DELAY = 3000;

amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        channel.assertQueue(QUEUE, {
            durable: false
        });

        setInterval(() => {
            var temperature = String(Math.random() * (30 - 25) + 25);
            console.log(`Temperatura enviada ${temperature}`);
            channel.sendToQueue(QUEUE, Buffer.from(temperature));

        }, DELAY)
    });
   
});

// connection.close();
// process .exit(0);