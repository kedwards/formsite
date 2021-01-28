// import { accessibleRecordsPlugin } from "@casl/mongoose";
import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

// mongoose.plugin(accessibleRecordsPlugin);
export const AutoIncrement = mongooseSequence(mongoose);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (e) {
    console.error(`Error: ${e.message}`);
    process.exit(1);
  }
};

export default connectDB;
