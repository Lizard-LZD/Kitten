const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' })); // 增加请求体限制
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
connectDB();

app.get("/", (req, res) => res.send("API running"));

// Add your API route handlers here
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/adoptions",require("./routes/api/adoptions"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
