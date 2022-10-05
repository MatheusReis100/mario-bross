const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const gameBoard = document.querySelector('.game-board');
const musicaFundo = document.getElementById('musica-fundo');

let score;
let point = 0;
let time = 50;


const jump = espace => {

    if (espace.keyCode === 32) {
        mario.classList.add('jump');
        const musicJump = new Audio('./sounds/jump-small.wav');
        musicJump.play();
    }
    
    
    setTimeout(() =>{
        mario.classList.remove('jump');
    }, 500);
}

const loop = setInterval( () =>{

    const pipePosition = pipe.offsetLeft;
    const marioPosition = Number(window.getComputedStyle(mario).bottom.replace('px', ''));
    
    
    if(pipePosition <= 120 && pipePosition > 0 && marioPosition <= 105){
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px `;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px `;

        mario.src = './img/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '45px'; 
        const marioDie = new Audio('./sounds/mariodie.wav');
        marioDie.play();   

        pauseMusicaFundo();
        clearInterval(loop);
        clearInterval(score);
    
        setTimeout(gameOver, 3000);
        
    
    }

} , 10);


const gameOver = () => {
    const gameOverMusic = new Audio('./sounds/gameover.wav');
    gameOverMusic.play(); 
    gameBoard.innerHTML = ` 
         <img src="./img/mario-game-over.gif" class="game-over">
         <h2 class= 'geral-point'>Sua pontuação foi:<span id='gscore'></span></h2>
         <a href="mario.html"><button class='btn-game-over'>Reiniciar Partida</button></a>
         <a href="index.html"><button class='btn-game-over2'>Menu principal</button></a>
         `
         
         geralPoint();
}

const startScore = () => {
    score = setInterval(() => {
        morePoint();
    }, time);
    
}

const morePoint = () =>{
    point++
    
    let format = document.getElementById('score-number').innerText = `00${point}`;


    if (point > 100) {
        format = document.getElementById('score-number').innerText = `0${point}`;
    }
    if(point > 1000){
        format = document.getElementById('score-number').innerText = `${point}`;
    }
}

const geralPoint = () => {
    let totalPoint = point
    document.getElementById('gscore').innerText = ` ${totalPoint}`;
    
}

const startMusicaFundo = () => {
    setTimeout(() => {
        musicaFundo.play();
        musicaFundo.loop = true;
    }, 30);

}

const pauseMusicaFundo = () => {
    musicaFundo.pause();
}



document.addEventListener('keydown', jump);
window.addEventListener('load', startScore);
window.addEventListener('load', startMusicaFundo);

