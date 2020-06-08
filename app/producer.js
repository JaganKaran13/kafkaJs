const { Kafka } = require('kafkajs')

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

// Kafka Producer instance.
const producer = kafka.producer()

// Producer instance connects with kafka with the configuration.
producer.connect()

producer.send({
  // Topic name
  topic: 'test-topic',
  // Message to be produced in the topic.
  messages: [
    { 
      key:"DATA1", 
      value: 'Hai',
      headers: {
        "replication-id": "1"
      }
    },
    {
      key:"DATA2",
      value: 'Hello World'
    },
  ],
})

// producer.send({
//   topic: <String>,
//   messages: <Message[]>,
//   acks: <Number>,
//   timeout: <Number>,
//   compression: <CompressionTypes>,
// })

producer.disconnect()