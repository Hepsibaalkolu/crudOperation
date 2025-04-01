const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Allow requests from the frontend's URL
const corsOptions = {
  origin: 'https://crudoperation-frontend-aeu0.onrender.com', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions));

//https://crudoperation-frontend-aeu0.onrender.com
// mongoose.connect('mongodb://localhost:27017/Todo')
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
// Routes
const todoRoutes = require('./routes/todoRoutes');
app.use('/todos', todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// console.log("MONGO_URI:", process.env.MONGO_URI);
// console.log("PORT:", process.env.PORT);
