

setup();

async function setup() {

    const canvas = document.getElementById('game');
    const context = canvas.getContext('2d');

    let input= {};
    document.addEventListener('keydown', (event) => { input[event.key] = true; });
    document.addEventListener('keyup', (event) => { input[event.key] = false; });
    document.addEventListener('mousedown', () => { input['mousedown'] = true; });
    document.addEventListener('mouseup', () => { input['mousedown'] = false;});
    
    // let name = prompt( 'what name do you want?');
    const name = localStorage.getItem('name')
    const socket = io.connect();
    socket.emit('name', name);
    let game;
    socket.on('tick', (data) => { game = data; });

    setInterval(() => { socket.emit('input', { // send input 30 times a second
        right: (input['d'] || input['ArrowRight'] ? 1 : 0),
        left: (input['a'] || input['ArrowLeft'] ? 1 : 0),
        forward: (input['w'] || input['ArrowUp'] ? 1 : 0),
        shoot: (input['s'] || input['ArrowDown'] || input[' ']? 1 : 0)
    });}, 1000/30);

    setInterval(() => { draw(game) }, 1000/256); // draw as fast as possible
    function draw(game) {

        socket.emit('input', { // send input
            right: (input['d'] || input['ArrowRight'] ? 1 : 0),
            left: (input['a'] || input['ArrowLeft'] ? 1 : 0),
            forward: (input['w'] || input['ArrowUp'] ? 1 : 0),
            shoot: (input['s'] || input['ArrowDown'] || input[' '] || input['mousedown']? 1 : 0)
        });

        context.lineWidth = 3; // background
        context.fillStyle = 'black';
        context.strokeStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);

        if(game.asteroidSpawnRate == 0) { //score
            if(game.score == 0) {
                document.getElementById('score').innerHTML = `New <span style="color: #22d3ee""> Game </span> Starting <span style="color: #f97316"> SOON! </span>`;
            } else {
                document.getElementById('score').innerHTML = `Your <span style="color: #22d3ee">Fleet </span> Destroyed <span style="color: #f97316">${game.score}</span> Asteroids!`;
            }
        } else {
            document.getElementById('score').innerHTML = `Score: <span style="color: #f97316"> ${game.score} </span>`;
        }

        game?.lazers?.forEach(lazer => { // console.log(lazer);
            context.strokeStyle = "#f97316";
            context.beginPath()
            context.moveTo(lazer.x, lazer.y);
            context.lineTo(lazer.x - lazer.xv, lazer.y - lazer.yv);
            context.closePath()
            context.stroke();
        });

        Object.values(game?.ships).forEach(ship => { // console.log(ship)
            if(ship.lives <= 0){ return } // don't draw dead ships

            context.save();
            context.translate(ship.x, ship.y)
            context.rotate(-ship.angle)
            if(ship.input.forward){ // flame
                context.beginPath()
                context.moveTo(-ship.r *.8 , -ship.r *.3)
                context.lineTo(0,-ship.r * 1.7)
                context.lineTo(ship.r * .8 , -ship.r *.3)
                context.strokeStyle = "#f97316"
                context.fill();
                context.stroke()
            }
            context.strokeStyle = 'white'; // ship body
            context.beginPath()
            context.moveTo(0, ship.r * 2)
            context.lineTo(-ship.r, -ship.r)
            context.quadraticCurveTo(0, 0, ship.r, -ship.r)
            context.closePath()
            context.fill();
            context.stroke();
            context.restore();
          
            context.fillStyle = "#22d3ee" //name
            context.font = ship.r * 2.5 + "px sans-serif";
            context.textAlign = 'center';
            context.fillText(ship.name, ship.x, ship.y - ship.r * 5);
            context.fillStyle = "black"

            context.strokeStyle = "#f97316" // health bar
            context.beginPath();
            let healthWidth = ship.r * 5;
            context.moveTo(ship.x - (healthWidth / 2), ship.y - ship.r * 4);
            context.lineTo(( ship.x - (healthWidth / 2)) + ( healthWidth * ( ship.lives / ship.maxlives)), ship.y - (ship.r * 4 ));
            context.stroke();
            context.strokeStyle = 'white';
        });

        game?.asteroids?.forEach(asteroid => { // console.log(game.asteroids.length)
            context.strokeStyle = 'white';
            context.beginPath();
            context.arc(asteroid.x, asteroid.y, asteroid.r, 0, 2 * Math.PI);
            context.fill();
            context.stroke();
        });
    }
};
