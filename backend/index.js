const express = require('express'); 
const cors = require('cors'); 
const mongoose = require('mongoose'); 

const app = express(); 

// config JSON response
app.use(express.json()); 

// solve CORS 
app.use(cors({ credentials: true, origin: 'http://localhost:3000'})); 

// public folder for images
app.use(express.static('public'));

// Routes
const UserRoutes = require('./routes/UserRoutes');

app.use('/users', UserRoutes);


// config do banco de dados... 
const DB_USER = "vitorlima"; 
const DB_PASSWORD = "Hqvnwo9VMArbMmIj"; 

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@clusterpet.m1m8rdz.mongodb.net/test`)
.then(() => {
    app.listen(5000);
    console.log("Conectamos ao Mongodb");
})
.catch((err) => console.log(err));
