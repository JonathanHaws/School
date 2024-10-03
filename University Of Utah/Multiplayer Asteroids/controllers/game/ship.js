const distanceBetween = require('../../utils/distanceBetween');
const Lazer = require('./lazer.js');

class Ship {
    constructor(game ,name) {
        this.input = {forward:0, shoot:0, left:0, right: 0}
        this.r = 10; //radius
        this.reload = 0;
        this.burstReload = 0;
        this.speed = .2;
        this.torque = .07; //turning speed
        this.friction = .975;
        this.angle = 0;
        this.name = name;
        this.reset(game);
    }

    reset(game) {
        this.x = game.width / 2;
        this.y = game.height / 2;

        const overlappingOtherShips = (game) => {
            for (let ship of Object.values(game.ships)) {
                if (distanceBetween(ship.x, ship.y, this.x, this.y) < ship.r + this.r) { return true; }
            }
            return false;
        }

        let i = 0; // prevent infinite loop
        while (overlappingOtherShips(game) && i < 100) { //try and find spot that doesn't overlap other ships
            this.x = game.width*.25 + (Math.random() * (game.width *.5)); // add some margin and try to spawn close to the middle
            this.y = game.height*.25 + (Math.random() * (game.height *.5));
            i++;
        }

        this.xv = 0;
        this.yv = 0;
        this.lives = 50;
        this.maxlives = this.lives;
        if(game.asteroidSpawnRate > 0) { this.lives = 0; } // if player joins existing game, they are dead and only spectating until next round
    }

    tick(game) {
        if (this.lives <= 0) { return; }
        this.move();
        this.shoot(game);
        this.wrap(game);
        this.crash(game);
    }

    shoot(game) {
        if (this.reload > 0) { this.reload--; return;}
        if(this.input.shoot) {
            game.lazers.push(new Lazer(this.x, this.y, this.angle, 10, 2));

            this.reload = 17;
        } 
    } 

    move() {
        this.xv *= this.friction;
        this.yv *= this.friction;
        this.x += this.xv;
        this.y += this.yv;
        this.angle += ((this.input.left - this.input.right) * this.torque) ;
        this.angle = this.angle % (2 * Math.PI); //make valid radian angle between 0 and 2 PI
        this.xv += Math.sin(this.angle) * this.input.forward * this.speed;
        this.yv += Math.cos(this.angle) * this.input.forward * this.speed;
    }

    wrap (game) {
        if(this.x < 0 - this.r) { this.x = game.width + this.r; }
        if(this.x > game.width + this.r) { this.x = 0 - this.r; }
        if(this.y < 0 - this.r) { this.y = game.height + this.r; }
        if(this.y > game.height + this.r) { this.y = 0 - this.r; }
    }

    crash(game) {
        for (let asteroid of game.asteroids){
            if(distanceBetween(this.x, this.y, asteroid.x, asteroid.y) < asteroid.r + this.r ){
                this.lives -= 10;
                game.asteroids.splice(game.asteroids.indexOf(asteroid), 1);
            }
        }
    }
}
module.exports = Ship