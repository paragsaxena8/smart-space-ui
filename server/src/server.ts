import app from "./app";
import dotenv from "dotenv";
import { connect } from "mongoose";

dotenv.config({ path: "./.env" });
let DB = process.env.DB_HOST;

const mode = process.env.NODE_ENV;
if (mode === "production") {
  DB = process.env.DB_HOST_SERVER.replace("<PASSWORD>", process.env.DB_PASS);
}
// console.log(DB);

connect(DB)
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.log("Error While connecting to DB", err.message);
    process.exit(1);
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err: any) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message, err);
  server.close(() => {
    process.exit(1);
  });
});
