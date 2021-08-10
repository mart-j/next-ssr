import { connect, ConnectionOptions } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

const options: ConnectionOptions = {
  useFindAndModify: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
};

export const connectToDatabase = () => {
  return connect(MONGODB_URI, options);
};
