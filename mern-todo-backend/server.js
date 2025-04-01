const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB Atlas
// mongoose.connect(process.env.MONGO_URI)
mongoose.connect('mongodb+srv://hema123:hema123@cluster0.tgbx8.mongodb.net/TodoList')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes
const todoRoutes = require('./routes/todoRoutes');
app.use('/todos', todoRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// console.log("MONGO_URI:", process.env.MONGO_URI);
// console.log("PORT:", process.env.PORT);
