import { kafkaProperties } from './kafkaProperties';

// Kafka Configuration Settings.
const kafka = kafkaProperties();

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
      key: "DATA1",
      value: 'Hai',
      headers: {
        "replication-id": "1"
      }
    },
    {
      key: "DATA2",
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