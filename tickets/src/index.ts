import { app } from "./app";
import connectDB from "./db/db-connect";
import connectNats from "./nats/nats-connect";


connectNats()
connectDB();


app.listen(3000, () => console.log("listen on 3000!!!!"));
