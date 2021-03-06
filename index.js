const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const schoolRoute = require("./routes/school_r");
const userRoute = require("./routes/user_r");
const teacherRoute = require("./routes/teacher_r");
const studentRoute = require("./routes/student_r");
const cors = require("cors");

dotenv.config();

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`connected!`))
  .catch((err) => {
    console.log(`err`);
  });
app.use(express.json());
app.use(cors());

app.use("/school", schoolRoute);
app.use("/user", userRoute);
app.use("/teacher", teacherRoute);
app.use("/student", studentRoute);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
