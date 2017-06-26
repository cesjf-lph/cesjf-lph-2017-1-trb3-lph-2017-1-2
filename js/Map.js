function Map(l, c) {
  this.SIZE = 32;
  this.cells = [];
  this.imageLib = null;
  this.a = [];
  this.b = [];
  this.flechas = [];

  for (var i = 0; i < l; i++) {
    this.cells[i] = [];
    for (var j = 0; j < c; j++) {
      this.cells[i][j] = 0;
    }
  }
}

Map.prototype.loadMap = function(map) {//Função que carrega o mapa de acordo com a matriz casasMapa
  for (var i = 0; i < this.cells.length; i++) {
    for (var j = 0; j < this.cells[i].length; j++) {
      this.cells[i][j] = map[i][j];
      switch (map[i][j]) {//Faz a verificação de conteúdo das casas para incluir as torres
        case 94://Gera os dados das 2 torres de "a"
          var a = new Sprite()
          a.SIZE = SIZE * 2;
          a.x = j * SIZE+SIZE/2;
          a.y = i * SIZE+SIZE/2;
          a.lifeInicial = lifeTorresPequenas;
          a.life = a.lifeInicial;
          a.destroyed = false;
          a.mover = false;//Impede que as torres se movam
          a.seletor = 0;//Força do personagem no teste de colisão
          this.a.push(a);
        break;
        case 67://Gera os dados das 2 torres de "a"
          var b = new Sprite()
          b.SIZE = SIZE * 2;
          b.x = j * SIZE+SIZE/2;
          b.y = i * SIZE+SIZE/2;
          b.lifeInicial = lifeTorresPequenas;
          b.life = b.lifeInicial;
          b.destroyed = false;
          b.mover = false;//Impede que as torres se movam
          b.seletor = 0;//Força do personagem no teste de colisão
          this.b.push(b);
        break;
        case 99://Gera a torre principal de "a"
          var a = new Sprite()
          a.SIZE = SIZE * 3;
          a.x = j * SIZE+SIZE/2;
          a.y = i * SIZE+SIZE/2;
          a.lifeInicial = lifeTorresPrincipais;
          a.life = a.lifeInicial;
          a.destroyed = false;
          a.mover = false;//Impede que a torre se mova
          a.seletor = 0;//Força do personagem no teste de colisão
          this.a.push(a);
        break;
        case 62://Gera a torre principal de "b"
          var b = new Sprite()
          b.SIZE = SIZE * 3;
          b.x = j * SIZE+SIZE/2;
          b.y = i * SIZE+SIZE/2;
          b.lifeInicial = lifeTorresPrincipais;
          b.life = b.lifeInicial;
          b.destroyed = false;
          b.mover = false;//Impede que a torre se mova
          b.seletor = 0;//Força do personagem no teste de colisão
          this.b.push(b);
        break;
        default:
      }
    }
  }
}

Map.prototype.desenhar = function(ctx){//Função que desenha elementos na tela
  this.informacoes();//Função que desenha elementos auxiliares nas laterais e topo da tela
  this.desenharTiles(ctx);//Função que desenha os componentes imóveis do mapa
  for (var i = 0; i < this.a.length; i++) {
    this.a[i].desenharPose(ctx);//Função que desenha os personagens e as barras de life de a
  }
  for (var i = 0; i < this.b.length; i++) {//Chama o desenho do "b"
    this.b[i].desenharPose(ctx);//Função que desenha os personagens e as barras de life de b
  }
}

Map.prototype.informacoes = function(){//Função que desenha elementos auxiliares nas laterais e topo da tela
  //Desenha um fundo azul por traz do eCanvas
  ctx.fillStyle = "#156c99";
  ctx.fillRect (0, 0, eCanvas.width, eCanvas.height);

  //Desenha a barra de energia do "a"
  ctx.fillStyle = "hsl("+a.energia/eCanvas.height*120+",100%,50%)";
  ctx.fillRect (2 * SIZE + 3, eCanvas.height, SIZE - 6, - a.energia);

  //Desenha a barra de energia do "b"
  ctx.fillStyle = "hsl("+b.energia/eCanvas.height*120+",100%,50%)";
  ctx.fillRect (35 * SIZE + 3, eCanvas.height, SIZE - 6, - b.energia);

  //Adiciona texto "A" e "B" nas laterais
  ctx.textAlign="left";
  ctx.font = "4em Arial Black";
  ctx.fillStyle = "black";
  ctx.fillText("B", 36 * SIZE + 6, 70);
  ctx.fillStyle = "white";
  ctx.fillText("A", 0 * SIZE + 8, 70);

  //Adiciona texto "ENERGIA" a barra do "a"
  ctx.textAlign="center";
  ctx.fillStyle = "white";
  ctx.font = "2em Arial Black";
  ctx.fillText("E", 2 * SIZE + SIZE / 2, eCanvas.height / 2 - 90);
  ctx.fillText("N", 2 * SIZE + SIZE / 2, eCanvas.height / 2 - 60);
  ctx.fillText("E", 2 * SIZE + SIZE / 2, eCanvas.height / 2 - 30);
  ctx.fillText("R", 2 * SIZE + SIZE / 2, eCanvas.height / 2);
  ctx.fillText("G", 2 * SIZE + SIZE / 2, eCanvas.height / 2 + 30);
  ctx.fillText("I", 2 * SIZE + SIZE / 2, eCanvas.height / 2 + 60);
  ctx.fillText("A", 2 * SIZE + SIZE / 2, eCanvas.height / 2 + 90);

  //Adiciona texto "ENERGIA" a barra do "b"
  ctx.textAlign="center";
  ctx.fillStyle = "black";
  ctx.font = "2em Arial Black";
  ctx.fillText("E", 35 * SIZE + SIZE / 2, eCanvas.height / 2 - 90);
  ctx.fillText("N", 35 * SIZE + SIZE / 2, eCanvas.height / 2 - 60);
  ctx.fillText("E", 35 * SIZE + SIZE / 2, eCanvas.height / 2 - 30);
  ctx.fillText("R", 35 * SIZE + SIZE / 2, eCanvas.height / 2);
  ctx.fillText("G", 35 * SIZE + SIZE / 2, eCanvas.height / 2 + 30);
  ctx.fillText("I", 35 * SIZE + SIZE / 2, eCanvas.height / 2 + 60);
  ctx.fillText("A", 35 * SIZE + SIZE / 2, eCanvas.height / 2 + 90);

  //Adiciona texto "Tecle ' I ' para visualizar as instruções do jogo"
  ctx.textAlign="center";
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.font = "1em Arial Black";
  ctx.fillText("Tecle ' I ' para visualizar as instruções do jogo", eCanvas.width / 2, 30);
  ctx.strokeText("Tecle ' I ' para visualizar as instruções do jogo", eCanvas.width / 2, 30);

  //Desenha seletor de a
  if (a.seletor == 5){
    ctx.fillStyle = "yellow";
    ctx.fillRect (0 * SIZE, 3 * SIZE, SIZE * 2, SIZE * 3);
  }else if (a.seletor == 4){
    ctx.fillStyle = "yellow";
    ctx.fillRect (0 * SIZE, 6 * SIZE, SIZE * 2, SIZE * 3);
  }else if (a.seletor == 3){
    ctx.fillStyle = "yellow";
    ctx.fillRect (0 * SIZE, 9 * SIZE, SIZE * 2, SIZE * 3);
  }else if (a.seletor == 2){
    ctx.fillStyle = "yellow";
    ctx.fillRect (0 * SIZE, 12 * SIZE, SIZE * 2, SIZE * 3);
  }else if (a.seletor == 1){
    ctx.fillStyle = "yellow";
    ctx.fillRect (0 * SIZE, 15 * SIZE, SIZE * 2, SIZE * 3);
  }

  //Desenha seletor de b
  if (b.seletor == 5){
    ctx.fillStyle = "yellow";
    ctx.fillRect (36 * SIZE, 3 * SIZE, SIZE * 2, SIZE * 3);
  }else if (b.seletor == 4){
    ctx.fillStyle = "yellow";
    ctx.fillRect (36 * SIZE, 6 * SIZE, SIZE * 2, SIZE * 3);
  }else if (b.seletor == 3){
    ctx.fillStyle = "yellow";
    ctx.fillRect (36 * SIZE, 9 * SIZE, SIZE * 2, SIZE * 3);
  }else if (b.seletor == 2){
    ctx.fillStyle = "yellow";
    ctx.fillRect (36 * SIZE, 12 * SIZE, SIZE * 2, SIZE * 3);
  }else if (b.seletor == 1){
    ctx.fillStyle = "yellow";
    ctx.fillRect (36 * SIZE, 15 * SIZE, SIZE * 2, SIZE * 3);
  }
}

Map.prototype.desenharTiles = function(ctx){//Função que desenha os componentes imóveis do mapa
  for (var i = 0; i < this.cells.length; i++) {
    var linha = this.cells[i];
    for (var j = 0; j < linha.length; j++) {
      switch (this.cells[i][j]) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
        case 79:
        case 80:
        case 81:
        case 82:
          this.imageLib.drawImageTile(ctx, this.cells[i][j], 0, 0, 96, j*this.SIZE, i*this.SIZE); //desenha o chão
          break;
        case 100:
          break;
        default:
          this.imageLib.drawImageTile(ctx, "way", 0, 0, 32, j*this.SIZE, i*this.SIZE); //intervalo entre os players
          break
      }
    }
  }
  //Desenha as torres de a
  for (var i = 0; i < this.a.length; i++) {
    //Desenha as torres menores de a
    if (this.a[i].SIZE == 64){
      this.imageLib.drawImageTile(ctx, "tower", 0, 0, 64, this.a[i].x-this.a[i].SIZE/2, this.a[i].y-this.a[i].SIZE/2);
    }
    //Desenha a torre principal de a
    if (this.a[i].SIZE == 96){
      this.imageLib.drawImageTile(ctx, "castle", 0, 0, 96, this.a[i].x-this.a[i].SIZE/2, this.a[i].y-this.a[i].SIZE/2);
    }
  }
  //Desenha as torres de b
  for (var i = 0; i < this.b.length; i++) {
    //Desenha as torres menores de b
    if (this.b[i].SIZE == 64){
      this.imageLib.drawImageTile(ctx, "tower", 0, 0, 64, this.b[i].x-this.b[i].SIZE/2, this.b[i].y-this.b[i].SIZE/2);
    }
    //Desenha a torre principal de a
    if (this.b[i].SIZE == 96){
      this.imageLib.drawImageTile(ctx, "castle", 0, 0, 96, this.b[i].x-this.b[i].SIZE/2, this.b[i].y-this.b[i].SIZE/2);
    }
  }
}

Map.prototype.criaPersonagem = function(linha, coluna, seletor){//Função que gera os personagens selecionados na tela
  if (coluna < 20){//Se a coluna for igual a 7 cria personagem de "a"
    var a = new Sprite()
    a.imageLib = this.imageLib;
    a.poses = [//adiciona poses de a
      {key: "personagemA" + seletor, row: 11, col: 0, colMax:  7, time:  8},//0 - Caminhada para a direita com espada na mão
      {key: "personagemA" + seletor, row: 10, col: 0, colMax:  7, time:  8},//1 - Caminhada para baixo com espada na mão
      {key: "personagemA" + seletor, row:  9, col: 0, colMax:  7, time:  8},//2 - Caminhada para a esquerda com espada na mão
      {key: "personagemA" + seletor, row:  8, col: 0, colMax:  7, time:  8},//3 - Caminhada para cima com espada na mão
      {key: "personagemA" + seletor, row: 11, col: 0, colMax:  0, time:  8},//4 - Parado para a direita com espada na mão
      {key: "personagemA" + seletor, row: 10, col: 0, colMax:  0, time:  8},//5 - Parado para baixo com espada na mão
      {key: "personagemA" + seletor, row:  9, col: 0, colMax:  0, time:  8},//6 - Parado para a esquerda com espada na mão
      {key: "personagemA" + seletor, row:  8, col: 0, colMax:  0, time:  8},//7 - Parado para cima com espada na mão
      {key: "personagemA" + seletor, row: 15, col: 0, colMax:  5, time: 16},//8 - Espadada para a direita
      {key: "personagemA" + seletor, row: 13, col: 0, colMax:  5, time: 16},//9 - Espadada para a esquerda
      {key: "personagemA" + seletor, row: 12, col: 0, colMax:  5, time: 16},//10 - Espadada para cima
      {key: "personagemA" + seletor, row: 14, col: 0, colMax:  5, time: 16},//11 - Espadada para baixo
      {key: "personagemA" + seletor, row: 19, col: 0, colMax: 12, time: 16},//12 - Flecha para a direita
      {key: "personagemA" + seletor, row: 18, col: 0, colMax: 12, time: 16},//13 - Flecha para baixo
      {key: "personagemA" + seletor, row: 17, col: 0, colMax: 12, time: 16},//14 - Flecha para a esquerda
      {key: "personagemA" + seletor, row: 16, col: 0, colMax: 12, time: 16},//15 - Flecha para cima
      {key: "personagemA" + seletor, row:  7, col: 0, colMax:  7, time: 16},//16 - Bastão para a direita
      {key: "personagemA" + seletor, row:  6, col: 0, colMax:  7, time: 16},//17 - Bastão para baixo
      {key: "personagemA" + seletor, row:  5, col: 0, colMax:  7, time: 16},//18 - Bastão para a esquerda
      {key: "personagemA" + seletor, row:  4, col: 0, colMax:  7, time: 16},//19 - Bastão para cima
      {key: "personagemA" + seletor, row:  0, col: 0, colMax:  7, time: 16},//20 - Rei virado para cima
      {key: "personagemA" + seletor, row:  1, col: 0, colMax:  7, time: 16},//21 - Rei virado para a esquerda
      {key: "personagemA" + seletor, row:  2, col: 0, colMax:  7, time: 16},//22 - Rei virado para baixo
      {key: "personagemA" + seletor, row:  3, col: 0, colMax:  7, time: 16},//23 - Rei virado para a direita
    ]
    a.x = coluna * SIZE+SIZE/2;
    a.y = linha * SIZE+SIZE/2;
    a.SIZE = 32;
    a.vx = 0;
    a.vy = 0;
    a.lifeInicial = 100;
    a.life = 100;
    a.destroyed = false;
    if(seletor == 6 || seletor == 7){
      a.pose = 4;
      a.mover = false;
      a.y = a.y - 15;
      if (seletor == 7){
        a.y = a.y - 6;
        a.raio = 250;
      }else{
        a.raio = 350;
      }
    }else{
      a.raio = 150;
      a.mover = true;//Permite que o personagem se mova
    }
    a.seletor = seletor;//Força do personagem em no teste de colisão
    a.dir = "";//Variável de direção para controlar melhor as poses
    a.tempoPunch = 0;//Variável que controla o tempo do som de cada som de punch
    a.tempoFlecha = 0;//Variável que controla o tempo da flecha
    if (seletor == 5 || seletor == 4 || seletor == 2 || seletor == 6 || seletor == 7){//Controla se o personagem pode atirar
      a.atira = true;
    }else{
      a.atira = false;
    }
    this.a.push(a);
  }
  if (coluna > 20){//Se a coluna for igual a 30 cria personagem de "b"
    var b = new Sprite()
    b.imageLib = this.imageLib;
    b.poses = [//adiciona poses de b
      {key: "personagemB" + seletor, row: 11, col: 0, colMax:  7, time:  8},//0 - Caminhada para a direita com espada na mão
      {key: "personagemB" + seletor, row: 10, col: 0, colMax:  7, time:  8},//1 - Caminhada para baixo com espada na mão
      {key: "personagemB" + seletor, row:  9, col: 0, colMax:  7, time:  8},//2 - Caminhada para a esquerda com espada na mão
      {key: "personagemB" + seletor, row:  8, col: 0, colMax:  7, time:  8},//3 - Caminhada para cima com espada na mão
      {key: "personagemB" + seletor, row: 11, col: 0, colMax:  0, time:  8},//4 - Parado para a direita com espada na mão
      {key: "personagemB" + seletor, row: 10, col: 0, colMax:  0, time:  8},//5 - Parado para baixo com espada na mão
      {key: "personagemB" + seletor, row:  9, col: 0, colMax:  0, time:  8},//6 - Parado para a esquerda com espada na mão
      {key: "personagemB" + seletor, row:  8, col: 0, colMax:  0, time:  8},//7 - Parado para cima com espada na mão
      {key: "personagemB" + seletor, row: 15, col: 0, colMax:  5, time: 16},//8 - Espadada para a direita
      {key: "personagemB" + seletor, row: 13, col: 0, colMax:  5, time: 16},//9 - Espadada para a esquerda
      {key: "personagemB" + seletor, row: 12, col: 0, colMax:  5, time: 16},//10 - Espadada para cima
      {key: "personagemB" + seletor, row: 14, col: 0, colMax:  5, time: 16},//11 - Espadada para baixo
      {key: "personagemB" + seletor, row: 19, col: 0, colMax: 12, time: 16},//12 - Flecha para a direita
      {key: "personagemB" + seletor, row: 18, col: 0, colMax: 12, time: 16},//13 - Flecha para baixo
      {key: "personagemB" + seletor, row: 17, col: 0, colMax: 12, time: 16},//14 - Flecha para a esquerda
      {key: "personagemB" + seletor, row: 16, col: 0, colMax: 12, time: 16},//15 - Flecha para cima
      {key: "personagemB" + seletor, row:  7, col: 0, colMax:  7, time: 16},//16 - Bastão para a direita
      {key: "personagemB" + seletor, row:  6, col: 0, colMax:  7, time: 16},//17 - Bastão para baixo
      {key: "personagemB" + seletor, row:  5, col: 0, colMax:  7, time: 16},//18 - Bastão para a esquerda
      {key: "personagemB" + seletor, row:  4, col: 0, colMax:  7, time: 16},//19 - Bastão para cima
      {key: "personagemB" + seletor, row:  0, col: 0, colMax:  7, time: 16},//20 - Rei virado para cima
      {key: "personagemB" + seletor, row:  1, col: 0, colMax:  7, time: 16},//21 - Rei virado para a esquerda
      {key: "personagemB" + seletor, row:  2, col: 0, colMax:  7, time: 16},//22 - Rei virado para  baixo
      {key: "personagemB" + seletor, row:  3, col: 0, colMax:  7, time: 16},//23 - Rei virado para a direita
    ]
    b.x = coluna * SIZE+SIZE/2;
    b.y = linha * SIZE+SIZE/2;
    b.SIZE = 32;
    b.vx = 0;
    b.vy = 0;
    b.lifeInicial = 100;
    b.life = 100;
    b.destroyed = false;
    if(seletor == 6 || seletor == 7){
      b.pose = 6;
      b.mover = false;
      b.y = b.y - 15;
      if (seletor == 7){
        b.y = b.y - 6;
        b.raio = 250;
      }else{
        b.raio = 350;
      }
    }
    else{
      b.raio = 150;
      b.mover = true;//Permite que o personagem se mova
    }
    b.seletor = seletor;//Força do personagem em no teste de colisão
    b.dir = "";//Variável de direção para controlar melhor as poses
    b.tempoPunch = 0;//Variável que controla o tempo do som de cada som de punch
    b.tempoFlecha = 0;//Variável que controla o tempo da flecha
    if (seletor == 4 || seletor == 2 || seletor == 6 || seletor == 7){//Controla se o personagem pode atirar
      b.atira = true;
    }else{
      b.atira = false;
    }
    this.b.push(b);
  }
}

Map.prototype.moverPersonagens = function(map, dt){//Função que acrescenta valor a vy e vx para o personagem se mover
  for (var i = 0; i < this.a.length; i++){//Chama o movimenta do Sprite para a
    this.a[i].movimenta(dt);
  }
  for (var i = 0; i < this.b.length; i++){//Chama o movimenta do Sprite para b
    this.b[i].movimenta(dt);
  }
  for (var i = 0; i < this.a.length; i++) {
    for (var j = 0; j < this.b.length; j++) {
      if (this.a[i].mover == true){
        if (this.cells[Math.floor(this.a[i].y/SIZE)][Math.floor(this.a[i].x/SIZE) + 1] == this.cells[Math.floor(this.a[i].y/SIZE)][Math.floor(this.a[i].x/SIZE)] - 1){
          this.a[i].vx = 100;
          this.a[i].vy = 0;
          this.a[i].pose = 0;//Controla a pose de a em movimento
          if (this.a[i].atira == false){
            this.a[i].dir = 1;//Controla a direção de a
          }
        } else if (this.cells[Math.floor(this.a[i].y/SIZE) + 1][Math.floor(this.a[i].x/SIZE)] == this.cells[Math.floor(this.a[i].y/SIZE)][Math.floor(this.a[i].x/SIZE)] - 1){
          this.a[i].vy = 100;
          this.a[i].vx = 0;
          this.a[i].pose = 1;//Controla a pose de a em movimento
          this.a[i].dir = 2;//Controla a direção de a
        }else if (this.cells[Math.floor(this.a[i].y/SIZE) - 1][Math.floor(this.a[i].x/SIZE)] == this.cells[Math.floor(this.a[i].y/SIZE)][Math.floor(this.a[i].x/SIZE)] - 1){
          this.a[i].vy = -100;
          this.a[i].vx = 0;
          this.a[i].pose = 3;//Controla a pose de a em movimento
          this.a[i].dir = 0;//Controla a direção de a
        }else{
          this.a[i].vx = 0;
          this.a[i].vy = 0;
        }
      }
      if (this.b[j].mover == true){
        if (this.cells[Math.floor(this.b[j].y/SIZE)][Math.floor(this.b[j].x/SIZE) - 1] == this.cells[Math.floor(this.b[j].y/SIZE)][Math.floor(this.b[j].x/SIZE)] + 1){
          this.b[j].vx = -100;
          this.b[j].vy = 0;
          this.b[j].pose = 2;//Controla a pose de b em movimento
          if (this.b[j].atira == false){
            this.b[j].dir = 3;//Controla a direção de b
          }
        } else if (this.cells[Math.floor(this.b[j].y/SIZE) - 1][Math.floor(this.b[j].x/SIZE)] == this.cells[Math.floor(this.b[j].y/SIZE)][Math.floor(this.b[j].x/SIZE)] + 1){
          this.b[j].vy = -100;
          this.b[j].vx = 0;
          this.b[j].pose = 3;//Controla a pose de b em movimento
          this.b[j].dir = 0;//Controla a direção de b
        }else if (this.cells[Math.floor(this.b[j].y/SIZE) + 1][Math.floor(this.b[j].x/SIZE)] == this.cells[Math.floor(this.b[j].y/SIZE)][Math.floor(this.b[j].x/SIZE)] + 1){
          this.b[j].vy = 100;
          this.b[j].vx = 0;
          this.b[j].pose = 1;//Controla a pose de b em movimento
          this.b[j].dir = 2;//Controla a direção de b
        }else{
          this.b[j].vy = 0;
          this.b[j].vx = 0;
        }
      }
    }
  }
}

Map.prototype.testaRaio = function(){//Função que testa o personagem mais próximo para atirar
  var menorDistA = "";//Variável para testar menor distância
  var menorDistB = "";//Variável para testar menor distância
  for (var i = 0; i < this.a.length; i++) {
    for (var j = 0; j < this.b.length; j++) {
      var dx = this.a[i].x - this.b[j].x;
      var dy = this.a[i].y - this.b[j].y;
      var raio = Math.sqrt(
        Math.pow(dx,2)+
        Math.pow(dy,2)
      );
      if(raio<=this.a[i].raio){
        if (this.a[i].atira == true){
          var dist = Math.sqrt(Math.pow(this.b[j].x - this.a[i].x, 2) + Math.pow(this.b[j].y - this.a[i].y, 2));
          var vx = 500 * (this.b[j].x - this.a[i].x) / dist;
          var vy = 500 * (this.b[j].y - this.a[i].y) / dist;
          this.criaFlecha(this.a[i], vx, vy, "a");//Função que cria as flechas de a
        }
      }
      if(raio<=this.b[j].raio){
        if (this.b[j].atira == true){
          var dist = Math.sqrt(Math.pow(this.a[i].x - this.b[j].x, 2) + Math.pow(this.a[i].y - this.b[j].y, 2));
          var vx = 500 * (this.a[i].x - this.b[j].x) / dist;
          var vy = 500 * (this.a[i].y - this.b[j].y) / dist;
          this.criaFlecha(this.b[j], vx, vy, "b");//Função que cria as flechas de b
        }
      }
    }
  }
}

Map.prototype.paraAtirador = function(){//Função que interrompe vx e vy do atirador enquanto está atirando, controla tbm a pose dele durante o tiro
  for (var i = 0; i < this.a.length; i++) {
    if (this.a[i].tempoFlecha > 0){
      this.a[i].vx = 0;
      this.a[i].vy = 0;
      if (this.a[i].dir == 0){
        this.a[i].pose = 15;
      }else if (this.a[i].dir == 1){
        this.a[i].pose = 12;
      }else if (this.a[i].dir == 2){
        this.a[i].pose = 13;
      }else if (this.a[i].dir == 3){
        this.a[i].pose = 14;
      }
    }
    if (this.a[i].tempoFlecha < 0 && this.a[i].seletor == 6 || this.a[i].tempoFlecha < 0 && this.a[i].seletor == 7){
      this.a[i].pose = 4;
    }
  }
  for (var i = 0; i < this.b.length; i++) {
    if (this.b[i].tempoFlecha > 0){
      this.b[i].vx = 0;
      this.b[i].vy = 0;
      if (this.b[i].dir == 0){
        this.b[i].pose = 15;
      }else if (this.b[i].dir == 1){
        this.b[i].pose = 12;
      }else if (this.b[i].dir == 2){
        this.b[i].pose = 13;
      }else if (this.b[i].dir == 3){
        this.b[i].pose = 14;
      }
    }
    if (this.b[i].tempoFlecha < 0 && this.b[i].seletor == 6 || this.b[i].tempoFlecha < 0 && this.b[i].seletor == 7){
      this.b[i].pose = 6;
    }
  }
}

Map.prototype.criaFlecha = function(arqueiro, vx, vy, quemAtira){//Função que cria as flechas
  if (arqueiro.atira == true && arqueiro.tempoFlecha < 0){
    var flecha = new Sprite();
    flecha.x = arqueiro.x;
    flecha.y = arqueiro.y;
    flecha.vx=vx;
    flecha.vy=vy;
    flecha.SIZE = 5;
    flecha.quemAtira = quemAtira;
    if (flecha.vy > 100 && flecha.vy > 0){
      arqueiro.dir = 2;
    }else if (flecha.vy < 100 && flecha.vy > 0){
      if (flecha.vx < 0){
        arqueiro.dir = 3;
      }else if(flecha.vx > 0){
        arqueiro.dir = 1;
      }
    }else if(flecha.vy < -100 && flecha.vy < 0){
      if (flecha.vx < 0){
        arqueiro.dir = 0;
      }
    }else if(flecha.vy > -100 && flecha.vy < 0){
      if (flecha.vx < 0){
        arqueiro.dir = 3;
      }else if(flecha.vx > 0){
        arqueiro.dir = 1;
      }
    }else if(flecha.vx > 0 && flecha.vy == 0){
      arqueiro.dir = 1;
    }else if(flecha.vx < 0 && flecha.vy == 0){
      arqueiro.dir = 3;
    }
    arqueiro.tempoFlecha = 1;//Tempo entre uma flecha e outra
    flecha.tempoFlecha = 1;//Tempo para movimentar a flecha
    flecha.tempoSomFlecha = 1;//Tempo para som da flecha
    this.flechas.push(flecha);
  }
}

Map.prototype.moverFlechas = function(dt){//Função que movimenta as flechas
  for (var i = 0; i < this.flechas.length; i++){//Chama o movimenta do Sprite para as flechas
    if (this.flechas[i].tempoFlecha < 0.5){//Controla o tempo que começa mover as flechas
      this.flechas[i].desenharFlecha(ctx);
      this.flechas[i].movimenta(dt);
      if (this.flechas[i].tempoSomFlecha < 0.5 && this.flechas[i].tempoSomFlecha > -1){//Controla o tempo que sai o som
        soundLib.play("punch-off");
        this.flechas[i].tempoSomFlecha = -2;
      }
    }
  }
}

Map.prototype.testarColisaoFlechas = function(){//Função que chama o teste de colisão do Sprite e se tiro tiver colidido impede o movimento para ocorrer a batalha
  for (var i = 0; i < this.flechas.length; i++){
    if (this.flechas[i].quemAtira == "a"){
      for (var j = 0; j < this.b.length; j++) {
        if(this.flechas[i].colidiuCom(this.b[j])){
          this.b[j].life = this.b[j].life - 10;
          this.flechas[i].destroyed = true;
        }
      }
    }
  }
  for (var i = 0; i < this.flechas.length; i++){
    if (this.flechas[i].quemAtira == "b"){
      for (var j = 0; j < this.a.length; j++) {
        if(this.flechas[i].colidiuCom(this.a[j])){
          this.a[j].life = this.a[j].life - 10;
          this.flechas[i].destroyed = true;
        }
      }
    }
  }
}

Map.prototype.testarColisao = function(){//Função que chama o teste de colisão do Sprite e se personagem tiver colidido impede o movimento para ocorrer a batalha
  for (var i = 0; i < this.a.length; i++) {
    for (var j = 0; j < this.b.length; j++) {
      if(this.a[i].colidiuCom(this.b[j])){//Caso ocorra a colisão

        //Quando colide zera vx e vy de a e b para a batalha ocorrer
        this.a[i].vx = 0;
        this.a[i].vy = 0;
        this.b[j].vx = 0;
        this.b[j].vy = 0;

        //Adiciona som quando a esta em batalha
        if (this.a[i].tempoPunch < 0){
          this.a[i].tempoPunch = 1.3;
          soundLib.play("punch-on");
        }

        //Adiciona som quando b esta em batalha
        if (this.b[j].tempoPunch < 0){
          this.b[j].tempoPunch = 1.3;
          soundLib.play("punch-on");
        }

        //Quando colide consome a life de a e b
        this.a[i].life = this.a[i].life - dt*(20+20*this.a[i].seletor);//Consome a life do personagem a
        this.b[j].life = this.b[j].life - dt*(20+20*this.b[j].seletor);//Consome a life do personagem b

        //Controla a pose de a em batalha de acordo com o dir
        if (this.a[i].dir == 0){
          this.a[i].pose = 10;
        }else if (this.a[i].dir == 1){
          this.a[i].pose = 8;
        }else if (this.a[i].dir == 2){
          this.a[i].pose = 11;
        }else{
          this.a[i].pose = 9;
        }

        //Controla a pose de b em batalha de acordo com o dir
        if (this.b[j].dir == 0){
          this.b[j].pose = 10;
        }else if (this.b[j].dir == 1){
          this.b[j].pose = 8;
        }else if (this.b[j].dir == 2){
          this.b[j].pose = 11;
        }else{
          this.b[j].pose = 9;
        }
      }
    }
  }
  this.delete();
}

Map.prototype.atualizaDados = function(){
  //Recarrega barra de energia de a
  if(a.energia < eCanvas.height){
    a.energia = a.energia + dt * 10;
  }

  //Recarrega barra de energia de b
  if(b.energia < eCanvas.height){
    b.energia = b.energia + dt * 10;
  }

  //Subtrai tempo para a flecha sair do arco e som de acordo com dt
  for (var k = 0; k < this.flechas.length; k++) {
    this.flechas[k].tempoFlecha = this.flechas[k].tempoFlecha - dt;
    this.flechas[k].tempoSomFlecha = this.flechas[k].tempoSomFlecha - dt;
  }

  for (var i = 0; i < this.a.length; i++){
    //Subtrai tempoPunch de acordo com dt
    this.a[i].tempoPunch = this.a[i].tempoPunch - dt;

    //Subtrai tempoFlecha de acordo com dt
    this.a[i].tempoFlecha = this.a[i].tempoFlecha - dt;

    //Subtrai tempoAlert de acordo com dt
    this.a[i].tempoAlert = this.a[i].tempoAlert - dt;

    if (this.a[i].life <= 0){
      this.a[i].destroyed = true;
      if (this.a[i].SIZE == 96){//Se a vida da torre principal de a estiver zerada a auxiliar passa a valer 4 que nas telas é vitoria de b
        auxiliar = 4;
        soundLib.play("Ta-Da");//Adiciona som de palmas pela destruião da torre principal
      }
      if (this.a[i].SIZE == 64){//Adiciona som de esplosão quando esplode as pequenas torres de a
        soundLib.play("explosion");
        if (this.a[i].y<200){
          a.atiraA1 = false;
          this.a[3].destroyed = true;
        }
        if (this.a[i].y>200){
          a.atiraA2 = false;
          this.a[4].destroyed = true;
        }
      }
      if (this.a[i].SIZE == 32){//Adiciona som quando personagem morre
        soundLib.play("dying");
      }
    }
  }
  for (var i = 0; i < this.b.length; i++){
    //Subtrai tempoPunch de acordo com dt
    this.b[i].tempoPunch = this.b[i].tempoPunch - dt;

    //Subtrai tempoFlecha de acordo com dt
    this.b[i].tempoFlecha = this.b[i].tempoFlecha - dt;

    //Subtrai tempoAlert de acordo com dt
    this.b[i].tempoAlert = this.b[i].tempoAlert - dt;

    if (this.b[i].life <= 0){
      this.b[i].destroyed = true;
      if (this.b[i].SIZE == 96){//Se a vida da torre principal de a estiver zerada a auxiliar passa a valer 4 que nas telas é vitoria de b
        auxiliar = 4;
        soundLib.play("Ta-Da");//Adiciona som de palmas pela destruião da torre principal
      }
      if (this.b[i].SIZE == 64){//Adiciona som de esplosão quando esplode as pequenas torres de a
        soundLib.play("explosion");
        if (this.b[i].y<200){
          b.atiraB1 = false;
          this.b[3].destroyed = true;
        }
        if (this.b[i].y>200){
          b.atiraB2 = false;
          this.b[4].destroyed = true;
        }
      }
      if (this.b[i].SIZE == 32){//Adiciona som quando personagem morre
        soundLib.play("dying");
      }
    }
  }
}

Map.prototype.delete = function(){//Função que deleta os personagens da tela
  for (var i = 0; i < this.a.length; i++) {
    if (this.a[i].destroyed == true){
      this.a.splice(i,1);
    }
  }
  for (var i = 0; i < this.b.length; i++) {
    if (this.b[i].destroyed == true){
      this.b.splice(i,1);
    }
  }
  for (var i = 0; i < this.flechas.length; i++) {
    if (this.flechas[i].destroyed == true){
      this.flechas.splice(i,1);
    }
  }
}
