// variaveis no escopo global
let pfundo
let imagemNave
let imagemLaser
let imagemFogo1
let imagemFogo2

let posicaoNave
let velocidadeLaser = 2.5 // era 5
let velocidadeNave  = 10 // era 10

let quantDisparos = 0
let quantMaximaLaser = 16

// PLACAR
let fonte
let tamanhoDaFonte = 25
let pontos = 0

// AUDIO
let trilha

// criar listas
let posicoesLaser = []
let imagemAlien   = []

// lista de aliens 10 no total length
let aliens = [
  {
  	id: 0,
    image: "alien0.png",
    x: -50,
    y: -50,
    velocidade: 1,
    vivo: true
  },
  {
  	id: 1,
    image: "alien1.png",
    x: 50,
    y: -50,
    velocidade: 1.1,
    vivo: true
  },
  {
  	id: 2,
    image: "alien2.png",
    x: 250,
    y: -50,
    velocidade: 1,
    vivo: true
  },
  {
  	id: 3,
    image: "alien3.png",
    x: 350,
    y: -50,
    velocidade: 1.2,
    vivo: true
  },
  {
  	id: 4,
    image: "alien4.png",
    x: 450,
    y: -50,
    velocidade: 1,
    vivo: true
  },
  {
  	id: 5,
    image: "alien5.png",
    x: 550,
    y: -50,
    velocidade: 1,
    vivo: true
  },
  {
  	id: 6,
    image: "alien4.png",
    x: 750,
    y: -50,
    velocidade: 1,
    vivo: true
  },
  {
  	id: 7,
    image: "alien3.png",
    x: 850,
    y: -50,
    velocidade: 1,
    vivo: true
  },
  {
  	id: 8,
    image: "alien2.png",
    x: 100,
    y: -100,
    velocidade: 1,
    vivo: true
  },
  {
  	id: 9,
    image: "alien1.png",
    x: 500,
    y: -100,
    velocidade: 1,
    vivo: true
  }
]

let aliensTotal = aliens.length
let aliensAbatidos = 0
//console.log('Quant. de aliens ' + aliensTotal)

// precarregar imagem, som, fontes, json, etc
function preload() {
  
  // carregar a imagem da nave
  imagemNave  = loadImage("./images/nave2.png") // 98x75 ou 50x38
  
  // carregar todos os aliens que estao no array de objetos
  for(let alien of aliens) {
    imagemAlien.push(loadImage("./images/"+alien.image)) // 124x122 ou 50x48
  }
  
  // carregar a imagem do laser
  imagemLaser = loadImage("./images/laser.png") // 9x37
  
  // carregar fonte
  fonte = loadFont("./fonts/VT323-Regular.ttf")
  
  // fogos
  imagemFogo1 = loadImage("./images/fire01.png") // 14x31
  imagemFogo2 = loadImage("./images/fire02.png") // 14x31
  
  // carregar som
  trilha = loadSound('./audio/trilha-corte1.mp3') // aprox 19s
}

// executar codigos uma vez
function setup() {
  //.loop() repete sempre 
  trilha.loop() // .play() reproduz so uma vez ate o final

  // criar tela 900x600 px
  createCanvas(900, 600)
  
  pfundo = loadImage('/images/fundoazul1.png');

  // criar o vetor (pos X, pos Y, pos Z)
  posicaoNave = createVector(425, 550)

  // configuracao dos textos da tela
  textFont(fonte)
  textSize(tamanhoDaFonte)
  textAlign(CENTER, CENTER)

  desenharFogo()
  
  
} // fim setup

// executar codigos sempre de tempo em tempo
function draw() {

  background(pfundo);

  

  // cor do texto do placar
  fill(255) // cor branca
  text('Space Invaders criado por Marcelo Pires', 450, 25)
  text('Placar '+ pontos + ' | 10', 820, 25)
  text('Laser ' + quantDisparos + ' | 15', 80, 25)
  
  // desenhar atores na tela
  desenharFogo()
  desenharNave()
  desenharLaser()
  desenharAliens()
  
  // mover atores
  moverNave()
  moverLaser()
  moverAliens()
  
  // verificar se laser colidiu com aliens
  colidiu()
  
} // fim draw

function desenharNave() {
  
  // desenhar imagem na tela do jogo
  image(imagemNave, posicaoNave.x, posicaoNave.y, 50, 38)
  
}

function desenharAliens() {
  
  for(let i = 0; i < aliens.length; i++) {
    
    if(aliens[i].vivo === true) {
      image(imagemAlien[i], aliens[i].x, aliens[i].y, 50, 48) 
    }
    
  }
  
} // fim desenharAliens

function moverAliens() {
  
  for(let i = 0; i < aliens.length; i++) {
  
    // se a posicao y for menor que a altura da tela mover
    if(aliens[i].y <= 650) {
      
      aliens[i].y = aliens[i].y + aliens[i].velocidade
      
    // senao mude a posicao y para -50 inicial
    //       mude a posicao x para pos x + 25px
    } else {
    
      aliens[i].y = -50
      aliens[i].x = aliens[i].x + 25
    
    }
   
  }
  
} // fim moverAliens

function moverNave() {
  
  if(keyIsPressed === true && keyCode != 32) keyPressed()
  
}

// comandos de teclado keyPressed()
function keyPressed() {
  
  // MOVER NAVE SETAS DIRECIONAIS DO TECLADO
  if(posicaoNave.x <= 850) {
    // AVANCAR ou RECUAR
    if(keyCode === RIGHT_ARROW) {
        posicaoNave.x = posicaoNave.x + velocidadeNave
    }
  }
  
  if(posicaoNave.x > 0) {
    if(keyCode === LEFT_ARROW) {
        posicaoNave.x = posicaoNave.x - velocidadeNave
    }
  }
  
// DISPARAR CONTINUAMENTE APOS MOVER A NAVE
//posicoesLaser.push(createVector(posicaoNave.x+44, posicaoNave.y-37))
  
  // DISPARAR LASER USANDO A BARRA DE ESPACO
  if(keyCode === 32) {    
    
    let metadeNave = 20 // 25 - (9/2 = 4.5) = 20.5
    
    if(quantDisparos <= quantMaximaLaser)  {
    
      posicoesLaser.push(createVector(posicaoNave.x+metadeNave, posicaoNave.y-37))
      
      // atualizar numero de disparos do laser
      atualizaDisparosLaser()
      
    }
    
  }
  
} // fim keyPressed

// DESENHAR O LASER E MOVER
function desenharLaser() {
  //image(imagemLaser, posicaoLaser.x, posicaoLaser.y)
  
  for(let posicao of posicoesLaser) {
      image(imagemLaser, posicao.x, posicao.y)
  }
  
}

function moverLaser() {
  //posicaoLaser.y = posicaoLaser.y - 1
  
  for(let posicao of posicoesLaser) {
    
    if(posicao.y <= 600 || posicao.y >= -37) {
      posicao.y = posicao.y - velocidadeLaser
    }
    
  }
  
}

// COLISOES do laser com os aliens
function colidiu() {
  
  for(let laser of posicoesLaser) {
    
    for(let alien of aliens) {
      
      if((laser.x)+9 < alien.x || (alien.x)+ 50 < laser.x || laser.y > (alien.y+50) || laser.y <= -37) {
        // nao atingiu
      } else {
        // atingiu
        alien.vivo = false
        laser.y = -37 // fazer o laser sumir
        
        let abates = contarAbates()
        atualizaPontos(abates)
      } // fim do if else
      
    } // fim do for aliens
    
  } // fim do for laser
  
}

function contarAbates() {

  //let vivos = aliens.filter(alien => (alien.vivo == true))
  let abates = aliens.filter(alien => (alien.vivo == false))
  
  //console.log(vivos)
  //console.log(abates)

  if(abates.length >= 7) {
    
    console.log("FIM DA RODADA")
    
  }
  
  return abates
  
}

function atualizaPontos(abates) {

  pontos = abates.length
  
}

function atualizaDisparosLaser() {
  
  if(quantMaximaLaser <= 15 && quantDisparos < 15) {
    quantDisparos = quantDisparos + 1
  }
  
  if(quantDisparos >= 15) {
    quantDisparos = 16
  }
  
}

function desenharFogo() {
  image(imagemFogo1, posicaoNave.x, 580, 5, 25)
  image(imagemFogo2, posicaoNave.x+18, 580)
  image(imagemFogo1, posicaoNave.x+45, 580, 5, 25)
}

function fimDaFase() {

  // regras de negocio para finalizar a fase
  if(abates.length >= 7) {
    console.log('FIM DA FASE')
    trilha.stop() // parar de reproduzir o som
  }
  
}

function fimDoJogo() {
  // regras de negocio para finalizar o jogo
}
