const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const workoutRoutes = require("./routes/workouts");

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listenning for requests
    const port = process.env.PORT;
    app.listen(port, () => {
      console.log(`Connected to db and Server running on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
