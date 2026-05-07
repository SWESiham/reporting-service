require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());

app.use("/api/dashboard", require('./routes/report.routes'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});