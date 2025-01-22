const express = require("express");
const app = express();
const userRouter = require("./routes/user-router")
require("dotenv").config();
require("./config/db");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/user",userRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
