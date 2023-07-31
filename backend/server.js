const express = require('express');
const connectDB = require('./config/db')
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
connectDB();
app.get('/',(req, res)=> res.send('API running'));

// Add your API route handlers here

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
