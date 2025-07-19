import { natsWrapper } from "./nats-wrapper";

const connectNats = async () => {
    // if (!process.env.NATS_CLUSTER_ID) {
    //     throw new Error("NATS_CLUSTER_ID must be defined");
    // }
    // if (!process.env.NATS_CLIENT_ID) {
    //     throw new Error("NATS_CLIENT_ID must be defined");
    // }
    // if (!process.env.NATS_URL) {
    //     throw new Error("NATS_URL must be defined");
    // }
  try {
    await natsWrapper.connect('ticketing', 'sdfgh','http://nats-srv:4222');
    console.log("NATS connected successfully!");
  } catch (error) {
    console.error(error);
  }
};

export default connectNats;
