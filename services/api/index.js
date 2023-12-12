import * as dotenv from "dotenv";
import express from "express";
import { usePlugins, useMongoDB } from "./src/plugins/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

usePlugins(app);

useMongoDB(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log("Press Ctrl+C to quit.");
    console.log(`url: http://localhost:${PORT}`);
  });
});

export default app;
