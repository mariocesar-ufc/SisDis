
var amqp = require('amqplib/callback_api');

const QUEUE = 'NIVELAGUA'
const DELAY = 10000;

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
            var waterLevel = String(Math.random() * (35 - 30) + 30);
            console.log(`Nivel de agua: ${waterLevel}`);
            channel.sendToQueue(QUEUE, Buffer.from(waterLevel));

        }, DELAY)
    });
   
});

// connection.close();
// process .exit(0);