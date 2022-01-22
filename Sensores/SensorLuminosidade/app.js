
var amqp = require('amqplib/callback_api');

const QUEUE = 'LUMINOSIDADE'
const DELAY = 6000;

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
            var luminosity = String(Math.random() * (100 - 50) + 50);
            console.log(`Nivel de luminosidade: ${luminosity}`);
            channel.sendToQueue(QUEUE, Buffer.from(luminosity));

        }, DELAY)
    });
   
});

// connection.close();
// process .exit(0);