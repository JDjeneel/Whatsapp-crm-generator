const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const generateMessageRoute = require("./routes/generateMessage");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/generate-message", generateMessageRoute);

app.listen(3000, () => console.log("Server running on port 3000"));
