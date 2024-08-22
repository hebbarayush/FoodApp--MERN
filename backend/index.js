const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
const mongoDB = require("./db");

(async () => {
  await mongoDB();

  // Use CORS middleware to handle CORS issues
  app.use(
    cors({
      origin: "http://localhost:3000", // Allow requests only from this origin
      methods: ["GET", "POST"], // Allow specific HTTP methods
      allowedHeaders: ["Content-Type"], // Allow specific headers
    })
  );

  app.use(express.json());

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.use("/api", require("./Routes/CreateUser"));
  app.use("/api", require("./Routes/DisplayData"));
  app.use("/api", require("./Routes/OrderData"));

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
})();
