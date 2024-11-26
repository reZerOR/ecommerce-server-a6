/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";
let server: Server;

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  console.log(error);
  console.error("Unhandled Rejection:", error);
  if (server) {
    server.close(() => {
      console.error("Server closed due to unhandled rejection");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

async function main() {
  try {
    await mongoose.connect(config.db_url as string);
    console.log("database connected");
    server = app.listen(config.port, () => {
      console.log("Application is running on port", config.port);
    });
  } catch (error) {
    console.error("server failed for this reason:", error);
    process.exit(1);
  }
}
main();
