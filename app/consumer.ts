import { kafkaProperties } from './kafkaProperties';

// Creates a kafka instance after calling the kafkaProperties function.
let kafka = kafkaProperties();

// Consumer should have a unique group id.
let consumer = kafka.consumer({ groupId: 'test-group' })

consumer.connect()

// Consumer subscribes to a particular topic and reads the message from beginning.
consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

// Run the consumer and process the each message. Batch message can be also processed.
consumer.run({

  // Automatic commit offsets is set to false for manual commiting, automatic commiting will slow the process of each message.
  autoCommit: false,
  // Process the each message. here the topic message is printed.
  eachMessage: async ({ topic, partition, message }) => {
    console.log("Topic Name::", topic);
    console.log("Partitions", partition);
    console.log("Message::\n", {
      key: message.key.toString(),
      value: message.value.toString(),
      headers: message.headers,
    })
  }
})