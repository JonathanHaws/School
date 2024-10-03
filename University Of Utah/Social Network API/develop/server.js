
// setup database
const mongoose = require('mongoose');
const db = require('./database/connection');
const { User, Thought } = require('./database/models'); 

// setup server
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const routes = require('./routes');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
db.once('open', () => { app.listen(PORT, () => { console.log(`Live on port ${PORT}`);});});
