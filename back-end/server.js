const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const connectDB = require('./config/db');
const dashboardRoutes = require('./routes/dashboard');
const searchRoutes = require("./routes/searches");
const favoriteRoutes = require("./routes/favorites");


dotenv.config();
connectDB();

const app = express();

// ✅ Correct CORS setup — only this one
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api', dashboardRoutes);

// app.use('/api/searches', require('./routes/searches'));

app.use("/api/searches", searchRoutes);
app.use("/api/favorites", favoriteRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
