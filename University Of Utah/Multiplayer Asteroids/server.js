const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const app = express();
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const http = require('http')
const server = http.createServer(app);
const io = require('socket.io')(server);
const Game = require('./controllers/game/game.js')
const Ship = require('./controllers/game/ship.js')

let game1 = new Game(60)
io.on('connection', client => {
  client.on('name', name => {
    // console.log(session)
    let player = game1.ships[client.id] = new Ship(game1, name)
    client.on('input', data => { player.input = data});
    setInterval(() => { client.emit('tick', game1) }, 1000 / 60);
    client.on('disconnect', () => { delete game1.ships[client.id] });
  });
});

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  server.listen(process.env.PORT || 3001,  () => console.log('Now listening'));
});
