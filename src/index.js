import _ from 'lodash';

const root = document.getElementById('root');
root.appendChild(addControls());
root.appendChild(setup());

let playerState = 'run';
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', function(e) {
    playerState = e.target.value;
});

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d'); 

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = "./img/shadow_dog.png";
const spriteWidth = 575;
const spriteHeight = 523;


let gameFrame = 0;
const staggerFrames = 5;
const spriteAnimations = [];
const animationStates = [
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'jump',
        frames: 7,
    },
    {
        name: 'fall',
        frames: 7,
    },
    {
        name: 'run',
        frames: 9,
    },
    {
        name: 'dizzy',
        frames: 11,
    },
    {
        name: 'sit',
        frames: 5,
    },
    {
        name: 'roll',
        frames: 7,
    },
    {
        name: 'bite',
        frames: 7,
    },
    {
        name: 'ko',
        frames: 12,
    },
    {
        name: 'getHit',
        frames: 4,
    }
];
animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let j = 0; j < state.frames; j++) {
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x: positionX, y: positionY});
    }
    spriteAnimations[state.name] = frames;
});
console.log(spriteAnimations);

function animate() {
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length;
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y;
    // s = source, d = destination
    //image = the image, then sx etc is what to crop out from the sprite sheet
    // dx etc... is where to put the cropped out image
    // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh); 
    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    gameFrame++;
    requestAnimationFrame(animate);
}

animate();

function addControls() {
    let controls = document.createElement('div');
    controls.classList.add('controls');

    let selectList = document.createElement('SELECT'); 
    selectList.id = 'animations', selectList.name = 'animations';

    let selectListLabel = document.createElement('label');
    selectListLabel.for = 'animations', selectListLabel.textContent = 'Choose Animation:';

    let option0 = document.createElement('option');
    option0.value = option0.textContent = 'idle';
    selectList.appendChild(option0);

    let option1 = document.createElement('option');
    option1.value = option1.textContent = 'jump';
    selectList.appendChild(option1);
    
    let option2 = document.createElement('option');
    option2.value = option2.textContent = 'fall';
    selectList.appendChild(option2);

    let option3 = document.createElement('option');
    option3.value = option3.textContent = 'run';
    selectList.appendChild(option3);

    let option4 = document.createElement('option');
    option4.value = option4.textContent = 'dizzy';
    selectList.appendChild(option4);

    let option5 = document.createElement('option');
    option5.value = option5.textContent = 'sit';
    selectList.appendChild(option5);

    let option6 = document.createElement('option');
    option6.value = option6.textContent = 'roll';
    selectList.appendChild(option6);

    let option7 = document.createElement('option');
    option7.value = option7.textContent = 'bite';
    selectList.appendChild(option7);

    let option8 = document.createElement('option');
    option8.value = option8.textContent = 'ko';
    selectList.appendChild(option8);

    let option9 = document.createElement('option');
    option9.value = option9.textContent = 'getHit';
    selectList.appendChild(option9);

    controls.appendChild(selectList)

    return controls
}

function setup() {
    let createCanvas = document.createElement('canvas');
    createCanvas.id = 'canvas1';
    return createCanvas
}


import css from './style.css';