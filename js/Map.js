function Map(l, c) {
  this.SIZE = 32;
  this.cells = [];
  this.imageLib = null;
  this.a = [];
  this.b = [];

  for (var i = 0; i < l; i++) {
    this.cells[i] = [];
    for (var j = 0; j < c; j++) {
      this.cells[i][j] = 0;
    }
  }
}

Map.prototype.desenhar = function(ctx){//Função que desenha elementos na tela
  //this.desenharLimites(ctx);
  this.informacoes();//Desenha informações complementares na tela (Barra de energia e cards)
  this.desenharTiles(ctx);
  for (var i = 0; i < this.a.length; i++) {//Chama o desenho do "a"
    this.a[i].desenharPose(ctx);
  }
  for (var i = 0; i < this.b.length; i++) {//Chama o desenho do "b"
    this.b[i].desenharPose(ctx);
  }
  this.vidaPersonagens();
  this.desenhaTorres();
}

/*Map.prototype.desenharLimites = function(ctx) {//Desenha estrutura do mapa
  for (var i = 0; i < this.cells.length; i++) {
    var linha = this.cells[i];
    for (var j = 0; j < linha.length; j++) {
      switch (this.cells[i][j]) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
          ctx.fillStyle = 'brown';
          ctx.strokeStyle = 'brown';
          ctx.fillRect(j * this.SIZE, i * this.SIZE, this.SIZE, this.SIZE);
          ctx.lineWidth = 3;
          ctx.strokeRect(j * this.SIZE, i * this.SIZE, this.SIZE, this.SIZE);
          break;
        case 0:
          ctx.fillStyle = 'green';
          ctx.strokeStyle = 'green';
          ctx.fillRect(j * this.SIZE, i * this.SIZE, this.SIZE, this.SIZE);
          ctx.lineWidth = 3;
          ctx.strokeRect(j * this.SIZE, i * this.SIZE, this.SIZE, this.SIZE);
          break;
        case 9:
          ctx.fillStyle = 'blue';
          ctx.strokeStyle = 'blue';
          ctx.fillRect(j * this.SIZE, i * this.SIZE, this.SIZE, this.SIZE);
          ctx.lineWidth = 3;
          ctx.strokeRect(j * this.SIZE, i * this.SIZE, this.SIZE, this.SIZE);
          break;
        case 100:
          ctx.fillStyle = 'white';
          ctx.strokeStyle = 'white';
          ctx.fillRect(j * this.SIZE, i * this.SIZE, this.SIZE, this.SIZE);
          ctx.lineWidth = 3;
          ctx.strokeRect(j * this.SIZE, i * this.SIZE, this.SIZE, this.SIZE);
          break;
        default:
          ctx.fillStyle = 'yellow';
          ctx.strokeStyle = 'yellow';
          ctx.fillRect(j * this.SIZE, i * this.SIZE, this.SIZE, this.SIZE);
          ctx.lineWidth = 3;
          ctx.strokeRect(j * this.SIZE, i * this.SIZE, this.SIZE, this.SIZE);
      }
    }
  }
};*/

Map.prototype.desenharTiles = function(ctx){//Função que coloca as imagens paradas na tela
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
          this.imageLib.drawImageTile(ctx, "chao", 0, 0, 32, j*this.SIZE, i*this.SIZE); //intervalo entre os players
          break
      }
    }
  }
}

Map.prototype.loadMap = function(map) {//Funão que carrega o mapa de acordo com a matriz casasMapa
  for (var i = 0; i < this.cells.length; i++) {
    for (var j = 0; j < this.cells[i].length; j++) {
      this.cells[i][j] = map[i][j];
      switch (map[i][j]) {//Faz a verificação de conteúdo das casas para incluir as torres
        case 94://Inclui as 2 torres pequenas de "a"
          var a = new Sprite()
          a.SIZE = SIZE * 2;
          a.x = j * SIZE+SIZE/2;
          a.y = i * SIZE+SIZE/2;
          a.life = 100;
          a.destroyed = false;
          a.mover = false;
          a.multiplicador = 0;//Força do personagem em no teste de colisão
          this.a.push(a);
        break;
        case 67://Inclui as 2 torres pequenas de "b"
          var b = new Sprite()
          b.SIZE = SIZE * 2;
          b.x = j * SIZE+SIZE/2;
          b.y = i * SIZE+SIZE/2;
          b.life = 100;
          b.destroyed = false;
          b.mover = false;
          b.multiplicador = 0;//Força do personagem em no teste de colisão
          this.b.push(b);
        break;
        case 99://Inclui a torre principal de "a"
          var a = new Sprite()
          a.SIZE = SIZE * 3;
          a.x = j * SIZE+SIZE/2;
          a.y = i * SIZE+SIZE/2;
          a.life = 100;
          a.destroyed = false;
          a.mover = false;
          a.multiplicador = 0;//Força do personagem em no teste de colisão
          this.a.push(a);
        break;
        case 62://Inclui a torre principal de "b"
          var b = new Sprite()
          b.SIZE = SIZE * 3;
          b.x = j * SIZE+SIZE/2;
          b.y = i * SIZE+SIZE/2;
          b.life = 100;
          b.destroyed = false;
          b.mover = false;
          b.multiplicador = 0;//Força do personagem em no teste de colisão
          this.b.push(b);
        break;
        default:
      }
    }
  }
};

/*Map.prototype.getIndices = function (sprite) {//Função que cria indices
   var pos = {};
   pos.c = Math.floor(sprite.x/this.SIZE);
   pos.l = Math.floor(sprite.y/this.SIZE);
   return pos;
};*/

Map.prototype.carregaBarra = function(){//Função que recarrega a barra de energia de "a" e de "b"
  if(a.energia < eCanvas.height){
    a.energia = a.energia + dt * 10;
  }
  if(b.energia < eCanvas.height){
    b.energia = b.energia + dt * 10;
  }
};

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
}

Map.prototype.criaPersonagem = function(linha, coluna, multiplicador){//Função que gera os personagens selecionados na tela
  if (coluna == 7){//Se a coluna for igual a 7 cria personagem de "a"
    var a = new Sprite()
    a.imageLib = this.imageLib;
    a.poses = [
    {key: "personagem1", row: 11, col: 0, colMax:  7, time:  8},
    ]
    a.x = coluna * SIZE+SIZE/2;
    a.y = linha * SIZE+SIZE/2;
    a.SIZE = 32;
    a.vx = 0;
    a.vy = 0;
    a.life = 100;
    a.destroyed = false;
    a.mover = true;
    a.multiplicador = multiplicador;//Força do personagem em no teste de colisão
    this.a.push(a);
  }
  if (coluna == 30){//Se a coluna for igual a 30 cria personagem de "b"
    var b = new Sprite()
    b.imageLib = this.imageLib;
    b.poses = [
    {key: "personagem1", row: 9, col: 0, colMax:  7, time:  8},
    ]
    b.x = coluna * SIZE+SIZE/2;
    b.y = linha * SIZE+SIZE/2;
    b.SIZE = 32;
    b.vx = 0;
    b.vy = 0;
    b.life = 100;
    b.destroyed = false;
    b.mover = true;
    b.multiplicador = multiplicador;//Força do personagem em no teste de colisão
    this.b.push(b);
  }
}

Map.prototype.moverPersonagens = function(dt) {//Função chama o mover do Sprite para cada um dos personagens
  for (var i = 0; i < this.a.length; i++){
    this.a[i].movimenta(dt);
  }
  for (var i = 0; i < this.b.length; i++){
    this.b[i].movimenta(dt);
  }
}

Map.prototype.move = function(map){//Função que acrescenta valor a vy e vx para o personagem se mover
  for (var i = 0; i < this.a.length; i++) {
    for (var j = 0; j < this.b.length; j++) {
      if (this.a[i].mover == true){
        var dx = this.a[i].x - this.b[j].x;
        var dy = this.a[i].y - this.b[j].y;
        var raio = Math.sqrt(
          Math.pow(dx,2)+
          Math.pow(dy,2)
        );
        if(raio<0){//Incluir posteriormente o perseguir (Útil com o arqueiro) // Para isso tem que alterar o valor do raio

        } else{//Faz o personagem seguir o caminho até a torre inimiga
          if (this.cells[Math.floor(this.a[i].y/SIZE)][Math.floor(this.a[i].x/SIZE) + 1] == this.cells[Math.floor(this.a[i].y/SIZE)][Math.floor(this.a[i].x/SIZE)] - 1){
            this.a[i].vx = 100;
            this.a[i].vy = 0;
          } else if (this.cells[Math.floor(this.a[i].y/SIZE) + 1][Math.floor(this.a[i].x/SIZE)] == this.cells[Math.floor(this.a[i].y/SIZE)][Math.floor(this.a[i].x/SIZE)] - 1){
            this.a[i].vy = 100;
            this.a[i].vx = 0;
          }else if (this.cells[Math.floor(this.a[i].y/SIZE) - 1][Math.floor(this.a[i].x/SIZE)] == this.cells[Math.floor(this.a[i].y/SIZE)][Math.floor(this.a[i].x/SIZE)] - 1){
            this.a[i].vy = -100;
            this.a[i].vx = 0;
          }else{
            this.a[i].vx = 0;
            this.a[i].vy = 0;
          }
        }
      }
    }
  }
  for (var i = 0; i < this.b.length; i++) {
    for (var j = 0; j < this.a.length; j++) {
      if (this.b[i].mover == true){
        var dx = this.b[i].x - this.a[j].x;
        var dy = this.b[i].y - this.a[j].y;
        var raio = Math.sqrt(
          Math.pow(dx,2)+
          Math.pow(dy,2)
        );
        if(raio<0){//Incluir posteriormente o perseguir (Útil com o arqueiro) // Para isso tem que alterar o valor do raio

        } else{//Faz o personagem seguir o caminho até a torre inimiga
          if (this.cells[Math.floor(this.b[i].y/SIZE)][Math.floor(this.b[i].x/SIZE) - 1] == this.cells[Math.floor(this.b[i].y/SIZE)][Math.floor(this.b[i].x/SIZE)] + 1){
            this.b[i].vx = -100;
            this.b[i].vy = 0;
          } else if (this.cells[Math.floor(this.b[i].y/SIZE) - 1][Math.floor(this.b[i].x/SIZE)] == this.cells[Math.floor(this.b[i].y/SIZE)][Math.floor(this.b[i].x/SIZE)] + 1){
            this.b[i].vy = -100;
            this.b[i].vx = 0;
          }else if (this.cells[Math.floor(this.b[i].y/SIZE) + 1][Math.floor(this.b[i].x/SIZE)] == this.cells[Math.floor(this.b[i].y/SIZE)][Math.floor(this.b[i].x/SIZE)] + 1){
            this.b[i].vy = 100;
            this.b[i].vx = 0;
          }else{
            this.b[i].vy = 0;
            this.b[i].vx = 0;
          }
        }
      }
    }
  }
}

Map.prototype.vidaPersonagens = function() {//Função que desenha a barra de life de cada um dos personagens
  for (var i = 0; i < this.a.length; i++) {
    ctx.fillStyle = "hsl("+this.a[i].life/100*120+",100%,50%)";
    ctx.fillRect (this.a[i].x-this.a[i].SIZE/2, this.a[i].y+this.a[i].SIZE/2, this.a[i].life/100*this.a[i].SIZE, 2);
  }
  for (var i = 0; i < this.b.length; i++) {
    ctx.fillStyle = "hsl("+this.b[i].life/100*120+",100%,50%)";
    ctx.fillRect (this.b[i].x-this.b[i].SIZE/2, this.b[i].y+this.b[i].SIZE/2, this.b[i].life/100*this.b[i].SIZE, 2);
  }
}

Map.prototype.desenhaTorres = function() {//Função que desenha as torres e o castelo
  for (var i = 0; i < this.a.length; i++) {
    if (this.a[i].SIZE == 64){
      this.imageLib.drawImageTile(ctx, "tower", 0, 0, 64, this.a[i].x-this.a[i].SIZE/2, this.a[i].y-this.a[i].SIZE/2);
    }
    if (this.a[i].SIZE == 96){
      this.imageLib.drawImageTile(ctx, "castle", 0, 0, 96, this.a[i].x-this.a[i].SIZE/2, this.a[i].y-this.a[i].SIZE/2);
    }
  }
  for (var i = 0; i < this.b.length; i++) {
    if (this.b[i].SIZE == 64){
      this.imageLib.drawImageTile(ctx, "tower", 0, 0, 64, this.b[i].x-this.b[i].SIZE/2, this.b[i].y-this.b[i].SIZE/2);
    }
    if (this.b[i].SIZE == 96){
      this.imageLib.drawImageTile(ctx, "castle", 0, 0, 96, this.b[i].x-this.b[i].SIZE/2, this.b[i].y-this.b[i].SIZE/2);
    }
  }
}

Map.prototype.testarColisao = function(){//Função que chama o teste de colisão do Sprite e se tiver colidido impede o mover para ocorrer a batalha
  for (var i = 0; i < this.a.length; i++) {
    for (var j = 0; j < this.b.length; j++) {
      if(this.a[i].colidiuCom(this.b[j])){
        this.a[i].vx = 0;
        this.a[i].vy = 0;
        this.a[i].life = this.a[i].life - dt*(20+20*this.a[i].multiplicador);//Consome a Life este valor em parenteses é a força do personagem
        if (this.a[i].life <= 0){
          this.a[i].destroyed = true;//Ativa a destruição
          if (this.a[i].SIZE == 96){
            auxiliar = 4;
          }
        }
      }
    }
  }
  for (var i = 0; i < this.b.length; i++) {
    for (var j = 0; j < this.a.length; j++) {
      if(this.b[i].colidiuCom(this.a[j])){
        this.b[i].vx = 0;
        this.b[i].vy = 0;
        this.b[i].life = this.b[i].life - dt*(20+20*this.b[i].multiplicador);//Consome a Life este valor em parenteses é a força do personagem
        if (this.b[i].life <= 0){
          this.b[i].destroyed = true;//Ativa a destruição
          if (this.b[i].SIZE == 96){
            auxiliar = 3;
          }
        }
      }
    }
  }
  this.delete();//Chama a função de deletar
}

Map.prototype.informacoes = function(){//Função que desenha outros elementos auxiliares na tela como por exemplo a barra de energia
  ctx.fillStyle = "#156c99";//Desenha um fundo azul por traz do eCanvas
  ctx.fillRect (0, 0, eCanvas.width, eCanvas.height);

  ctx.fillStyle = "hsl("+a.energia/eCanvas.height*120+",100%,50%)";//Desenha a barra de energia do "a"
  ctx.fillRect (2 * SIZE + 3, eCanvas.height, SIZE - 6, - a.energia);

  ctx.fillStyle = "hsl("+b.energia/eCanvas.height*120+",100%,50%)";//Desenha a barra de energia do "a"
  ctx.fillRect (35 * SIZE + 3, eCanvas.height, SIZE - 6, - b.energia);

  ctx.textAlign="left";//Adiciona texto "A" e "B"
  ctx.font = "4em Arial Black";
  ctx.fillStyle = "black";
  ctx.fillText("B", 36 * SIZE + 6, 70);
  ctx.fillStyle = "white";
  ctx.fillText("A", 0 * SIZE + 8, 70);

  ctx.textAlign="center";//Adiciona texto "ENERGIA" a barra do "a"
  ctx.fillStyle = "white";
  ctx.font = "2em Arial Black";
  ctx.fillText("E", 2 * SIZE + SIZE / 2, eCanvas.height / 2 - 90);
  ctx.fillText("N", 2 * SIZE + SIZE / 2, eCanvas.height / 2 - 60);
  ctx.fillText("E", 2 * SIZE + SIZE / 2, eCanvas.height / 2 - 30);
  ctx.fillText("R", 2 * SIZE + SIZE / 2, eCanvas.height / 2);
  ctx.fillText("G", 2 * SIZE + SIZE / 2, eCanvas.height / 2 + 30);
  ctx.fillText("I", 2 * SIZE + SIZE / 2, eCanvas.height / 2 + 60);
  ctx.fillText("A", 2 * SIZE + SIZE / 2, eCanvas.height / 2 + 90);

  ctx.textAlign="center";//Adiciona texto "ENERGIA" a barra do "b"
  ctx.fillStyle = "black";
  ctx.font = "2em Arial Black";
  ctx.fillText("E", 35 * SIZE + SIZE / 2, eCanvas.height / 2 - 90);
  ctx.fillText("N", 35 * SIZE + SIZE / 2, eCanvas.height / 2 - 60);
  ctx.fillText("E", 35 * SIZE + SIZE / 2, eCanvas.height / 2 - 30);
  ctx.fillText("R", 35 * SIZE + SIZE / 2, eCanvas.height / 2);
  ctx.fillText("G", 35 * SIZE + SIZE / 2, eCanvas.height / 2 + 30);
  ctx.fillText("I", 35 * SIZE + SIZE / 2, eCanvas.height / 2 + 60);
  ctx.fillText("A", 35 * SIZE + SIZE / 2, eCanvas.height / 2 + 90);

  if (a.seletor == 0){
    ctx.fillStyle = "yellow";//Desenha um fundo branco por traz do card 1 de "a"
    ctx.fillRect (0 * SIZE, 3 * SIZE, SIZE * 2, SIZE * 2.9);
  }else if (a.seletor == 1){
    ctx.fillStyle = "yellow";//Desenha um fundo branco por traz do card 1 de "a"
    ctx.fillRect (0 * SIZE, 6 * SIZE, SIZE * 2, SIZE * 3);
  }else if (a.seletor == 2){
    ctx.fillStyle = "yellow";//Desenha um fundo branco por traz do card 1 de "a"
    ctx.fillRect (0 * SIZE, 9 * SIZE, SIZE * 2, SIZE * 3);
  }else if (a.seletor == 3){
    ctx.fillStyle = "yellow";//Desenha um fundo branco por traz do card 1 de "a"
    ctx.fillRect (0 * SIZE, 12 * SIZE, SIZE * 2, SIZE * 3);
  }else if (a.seletor == 4){
    ctx.fillStyle = "yellow";//Desenha um fundo preto por traz do card 1 de "a"
    ctx.fillRect (0 * SIZE, 15 * SIZE, SIZE * 2, SIZE * 3);
  }
  if (b.seletor == 0){
    ctx.fillStyle = "yellow";//Desenha um fundo preto por traz do card 1 de "b"
    ctx.fillRect (36 * SIZE, 3 * SIZE, SIZE * 2, SIZE * 3);
  }else if (b.seletor == 1){
    ctx.fillStyle = "yellow";//Desenha um fundo preto por traz do card 1 de "b"
    ctx.fillRect (36 * SIZE, 6 * SIZE, SIZE * 2, SIZE * 3);
  }else if (b.seletor == 2){
    ctx.fillStyle = "yellow";//Desenha um fundo preto por traz do card 1 de "b"
    ctx.fillRect (36 * SIZE, 9 * SIZE, SIZE * 2, SIZE * 3);
  }else if (b.seletor == 3){
    ctx.fillStyle = "yellow";//Desenha um fundo preto por traz do card 1 de "b"
    ctx.fillRect (36 * SIZE, 12 * SIZE, SIZE * 2, SIZE * 3);
  }else if (b.seletor == 4){
    ctx.fillStyle = "yellow";//Desenha um fundo preto por traz do card 1 de "b"
    ctx.fillRect (36 * SIZE, 15 * SIZE, SIZE * 2, SIZE * 3);
  }
}

Map.prototype.desenhaTopo = function(){
  ctx.textAlign="center";//Adiciona texto "Tecle ' I ' para visualizar as instruções do jogo"
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.font = "1em Arial Black";
  ctx.fillText("Tecle ' I ' para visualizar as instruções do jogo", eCanvas.width / 2, 30);
  ctx.strokeText("Tecle ' I ' para visualizar as instruções do jogo", eCanvas.width / 2, 30);
}
