const path = require('path');
const express = require('express');
const routes = require('./controllers');
const session = require('express-session');
const handlebars = require('express-handlebars').create();
const sequelize = require('./config/connection');
const app = express();
const port = process.env.PORT || 3001;

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({secret: process.env.SESSION_SECRET, resave:false, saveUninitialized:true, cookie:{secure:'auto'}}));
app.use(routes);
app.use(express.static(path.join(__dirname, 'public')));
sequelize.sync({ force: false }).then(() => { app.listen(port, () => {console.log(`Server live ${port}.`);});});
