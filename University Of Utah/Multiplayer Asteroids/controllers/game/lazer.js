const distanceBetween = require('../../utils/distanceBetween');
const Asteroid = require('./asteroid');

class Lazer {
    constructor(x, y, angle, speed, start) {
        this.x = x;
        this.y = y;
        this.xv = Math.sin(angle) * speed; 
        this.yv = Math.cos(angle) * speed;
        this.x += this.xv * start;
        this.y += this.yv * start;
    }

    tick(game) {
        this.x += this.xv;
        this.y += this.yv;
        if(this.x > game.width || this.x < 0 || this.y > game.height || this.y < 0) {
            game.lazers.splice(game.lazers.indexOf(this), 1);
        }

        for (let asteroid of game.asteroids){ 
            if(distanceBetween(this.x, this.y, asteroid.x, asteroid.y) < asteroid.r ){
                game.lazers.splice(game.lazers.indexOf(this), 1);
                asteroid.lives --;
                if (asteroid.lives <= 0) {
                    game.asteroids.splice(game.asteroids.indexOf(asteroid), 1);
                    game.score ++;
                    game.asteroidSpawnRate *= 1.005 ;
                    if ((asteroid.r/2) > game.smallestAsteroidRadius) {
                        game.asteroids.push(new Asteroid(game, asteroid.r /2, asteroid.x, asteroid.y));
                        game.asteroids.push(new Asteroid(game, asteroid.r /2, asteroid.x, asteroid.y));
                    }
                }
            }
        }
    }
}

module.exports = Lazer