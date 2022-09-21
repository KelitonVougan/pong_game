//Variaveis da bolinha
let  xBolinha = 300;
let  yBolinha = 200;
let  diametro = 15;
let  velocXBolinha = 7;
let  velocYBolinha = 7;
let  raio = diametro / 2;

// variaveis da minha raquete
let  xMinhaRaquete = 10;
let  yMinhaRaquete = 150;

// variaveis raquete oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let veloYOponente;

// variaveis gerais raquetes
let alturaRaquete = 90;
let comprimentoRaquete = 10;
let varColisaoRaquete = false;

// variaveis do placar
let meusPontos = 0;
let pontosOponente = 0;
let chanceErrar = 0;

//variaveis sons
let soundPong;
let soundScore;

function preload(){
  soundPong = loadSound("pong.mp3");
  soundScore = loadSound("score.mp3"); 
  
}

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  desenharBolinha();
  movimentarBolinha();
  colisaoBolinha();
  desenharRaquete(xMinhaRaquete, yMinhaRaquete);
  desenharRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentarMinhaRaquete();
  colisaoRaquete(xMinhaRaquete, yMinhaRaquete);
  colisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  moviRaqueteOponente();
  placar();
  pontuacao();
  calcErro();
  bolinhaNaoFicaPresa();
 
  
// Funções da bolinha
function desenharBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentarBolinha(){
    xBolinha += velocXBolinha;
    yBolinha += velocYBolinha;
}

function colisaoBolinha(){
    if (xBolinha + raio > width || 
       xBolinha - raio < 0){
        velocXBolinha *= -1;  
    }
  
    if (yBolinha + raio > height || 
       yBolinha - raio < 0){
        velocYBolinha *= -1;
    }
}
  
function bolinhaNaoFicaPresa(){
  if (xBolinha + raio < 0){
  console.log('bolinha ficou presa');
  xBolinha = 300;
  }
}

  
// Funções das raquetes
function desenharRaquete(x, y){
   rect(x, y, comprimentoRaquete, alturaRaquete); 
}

function movimentarMinhaRaquete(){
    if (keyIsDown(UP_ARROW)){
      yMinhaRaquete -= 10;
    }
    if (keyIsDown(DOWN_ARROW)){
      yMinhaRaquete += 10;
    }
}

// Essa função importa p5.collide2d.js
function colisaoRaquete(x, y){
  varColisaoRaquete = collideRectCircle(x, y, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, raio);
    if (varColisaoRaquete){
      velocXBolinha *= -1;
      soundPong.play();
    } 
}

function moviRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente -   comprimentoRaquete / 10- 40;
  yRaqueteOponente += velocidadeYOponente + chanceErrar
  calcErro();
  }  
}
  
// Placar
function placar(){
  fill(255)
  text(meusPontos, 150, 26);
  text(pontosOponente, 450, 26);
  text("PLACAR", 275, 26);
  }
function pontuacao(){
  if (xBolinha > 590){
      meusPontos += 1;
      soundScore.play();
    }
  if (xBolinha < 10){
      pontosOponente += 1;
      soundScore.play();
    }
  }


// Calcula taxa de erro da I.A
function calcErro(){
  if (pontosOponente >= meusPontos){
      chanceErrar += 1
    if (chanceErrar >= 39){
       chanceErrar = 40 
    } else {
      if (chanceErrar <= 35){
        chanceErrar =35
      }
    }
  }
}