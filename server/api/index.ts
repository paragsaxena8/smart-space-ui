import app from "../src/app";

import dotenv from "dotenv";
import { connect } from "mongoose";

dotenv.config({ path: "./.env" });
let DB = process.env.DB_HOST;

const mode = process.env.NODE_ENV;
if (mode === "production") {
  DB = process.env.DB_HOST_SERVER.replace("<PASSWORD>", process.env.DB_PASS);
}

connect(DB)
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.log("Error While connecting to DB", err.message);
    process.exit(1);
  });

export default app;
