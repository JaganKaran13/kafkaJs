import { Kafka } from 'kafkajs';

// Kafka Configuration Settings.
const kafka = new Kafka({
  // Kafka Client id
  clientId: 'sample',
  // List of brokers available and can be used in the function
  brokers: ['localhost:9092'],
  // Timeout in ms untill a successful connection is available
  connectionTimeout: 3000,
  // Timeout in ms untill a successful request it available.
  requestTimeout: 25000,
  // Retry Configuraiton. Retries grows exponentially
  retry: {
    // Initial retry time in ms.
    initialRetryTime: 100,
    // Number of retries.
    retries: 3
  }
})

// Consumer should have a unique group id.
const consumer = kafka.consumer({ groupId: 'test-group' })

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