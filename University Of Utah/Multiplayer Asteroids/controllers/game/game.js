const Asteroid = require('./asteroid.js');

class Game {

    constructor(tickrate) {
        this.ships = {};
        this.asteroids = [];
        this.lazers = [];
        this.width = 1280;
        this.height = 720;
        this.asteroidSpawnRate = .0;
        this.smallestAsteroidRadius = 20;
        this.score = 0;
        this.countDown= null;
        
        
        setInterval(()=> this.tick(tickrate), 1000/tickrate);
        }

        tick(tickrate)  {
            Object.values(this.ships).forEach(ship => { ship.tick(this); });
            this.asteroids.forEach(asteroid => { asteroid.tick(this); });
            this.lazers.forEach(lazer => { lazer.tick(this); });
            if ( this.asteroids.length < 75 && Math.random() < this.asteroidSpawnRate) this.asteroids.push(new Asteroid(this)); 

            this.checkForGameOver();
        }

        checkForGameOver() {
            for (let ship of Object.values(this.ships)) { // if atleast one ship is alive, continue the game
                if (ship.lives > 0) { return } // nice biproduct is that if no one is in the game the game will be reset 
            }
            this.asteroidSpawnRate = 0;
            this.asteroids = [];
            this.lazers = [];
            Object.values(this.ships).forEach(ship => { ship.reset(this); });

            setTimeout(() => { // tell fleet there score
                this.score = 0;
                setTimeout(() => { // new game starting soon
                    this.asteroidSpawnRate = .007;
                }, 7500);
            }, 7000);
        }
    }

module.exports = Game;