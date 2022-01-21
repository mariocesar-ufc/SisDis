
var amqp = require('amqplib/callback_api');

const QUEUE = 'HUMIDITY'

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
            var msg = 'Humidade!';
            console.log(" [x] Sent %s", msg);
            channel.sendToQueue(QUEUE, Buffer.from(msg));

        }, 5000)
    });
   
});

// connection.close();
// process .exit(0);