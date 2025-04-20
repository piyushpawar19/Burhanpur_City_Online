const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./src/config/database');
const morgan = require("morgan");

// Routes
// const authRoutes = require('./src/routes/authRoutes');
// const businessRoutes = require('./src/routes/businessRoutes');
// const categoryRoutes = require('./src/routes/categoryRoutes');
// const subcategoryRoutes = require('./src/routes/categoryRoutes');
// const jobRoutes = require('./src/routes/jobRoutes');
// const advertisementRoutes = require('./src/routes/advertisementRoutes');
const userRouter = require ('./src/routes/UserRouter');
const BussinessRouter = require("./src/routes/BussinessRouter");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(morgan());

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/business', businessRoutes);
// app.use('/api/category', categoryRoutes);
// app.use('/api/subcategory', subcategoryRoutes);
// app.use('/api/jobs', jobRoutes);
// app.use('/api/advertisements', advertisementRoutes);
app.use("/api/Users",userRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.get("/", async (req, res) => {
    
      res.status(200).json({
        success: "Hello from the server",
        message: "Server is running perfectly",
      });

});

connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});