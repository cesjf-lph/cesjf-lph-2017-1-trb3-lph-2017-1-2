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

Map.prototype.desenhar = function(ctx){
  //this.desenharLimites(ctx);
  this.desenharTiles(ctx);
  for (var i = 0; i < this.a.length; i++) {//Chama o desenho do "a"
    this.a[i].desenharLimites(ctx);
  }
  for (var i = 0; i < this.b.length; i++) {//Chama o desenho do "b"
    this.b[i].desenharLimites(ctx);
  }
}

Map.prototype.desenharLimites = function(ctx) {//Desenha estrutura do mapa
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
};

Map.prototype.desenharTiles = function(ctx){
  for (var i = 0; i < this.cells.length; i++) {
    var linha = this.cells[i];
    for (var j = 0; j < linha.length; j++) {
      switch (this.cells[i][j]) {
        case 0:
          this.imageLib.drawImageTile(ctx, "0", 0, 0, 32, j*this.SIZE, i*this.SIZE); //desenha chao
          break;
        case 1:
          this.imageLib.drawImageTile(ctx, "1", 0, 0, 32, j*this.SIZE, i*this.SIZE); //desenha chao
          break;
        case 2:
          this.imageLib.drawImageTile(ctx, "2", 0, 0, 32, j*this.SIZE, i*this.SIZE); //desenha chao
          break;
        case 3:
          this.imageLib.drawImageTile(ctx, "3", 0, 0, 32, j*this.SIZE, i*this.SIZE); //desenha chao
          break;
        case 4:
          this.imageLib.drawImageTile(ctx, "4", 0, 0, 32, j*this.SIZE, i*this.SIZE); //desenha chao
          break;
        case 5:
          this.imageLib.drawImageTile(ctx, "5", 0, 0, 32, j*this.SIZE, i*this.SIZE); //desenha chao
          break;
        case 6:
          this.imageLib.drawImageTile(ctx, "6", 0, 0, 32, j*this.SIZE, i*this.SIZE); //desenha chao
          break;
        case 7:
          this.imageLib.drawImageTile(ctx, "7", 0, 0, 32, j*this.SIZE, i*this.SIZE); //desenha chao
          break;
        case 8:
          this.imageLib.drawImageTile(ctx, "8", 0, 0, 32, j*this.SIZE, i*this.SIZE); //desenha chao
          break;
        case 9:
          this.imageLib.drawImageTile(ctx, "intervalo", 0, 0, 32, j*this.SIZE, i*this.SIZE); //intervalo entre os players
          break
        case 10:
          var X = 10;
          if(this.cells[i][j+1] == X && this.cells[i+1][j] == X && this.cells[i-1][j] != X) this.imageLib.drawImageTile(ctx, "pc", 0, 0, 32, j*this.SIZE, i*this.SIZE);
          if(this.cells[i][j-1] == X && this.cells[i+1][j] == X && this.cells[i-1][j] != X) this.imageLib.drawImageTile(ctx, "pc", 0, 1, 32, j*this.SIZE, i*this.SIZE);
          if(this.cells[i-1][j] == X && this.cells[i][j+1] == X && this.cells[i+1][j] == X) this.imageLib.drawImageTile(ctx, "pc", 1, 0, 32, j*this.SIZE, i*this.SIZE);
          if(this.cells[i-1][j] == X && this.cells[i][j-1] == X && this.cells[i+1][j] == X) this.imageLib.drawImageTile(ctx, "pc", 1, 1, 32, j*this.SIZE, i*this.SIZE);
          if(this.cells[i-1][j] == X && this.cells[i][j+1] == X && this.cells[i+1][j] != X) this.imageLib.drawImageTile(ctx, "pc", 2, 0, 32, j*this.SIZE, i*this.SIZE);
          if(this.cells[i][j-1] == X && this.cells[i-1][j] == X && this.cells[i+1][j] != X) this.imageLib.drawImageTile(ctx, "pc", 2, 1, 32, j*this.SIZE, i*this.SIZE);          
          break;
        case 11:
          var X = 11;
          if(this.cells[i][j+1] == X && this.cells[i+1][j] == X && this.cells[i-1][j] != X) this.imageLib.drawImageTile(ctx, "pc2", 0, 0, 32, j*this.SIZE, i*this.SIZE);
          if(this.cells[i][j-1] == X && this.cells[i+1][j] == X && this.cells[i-1][j] != X) this.imageLib.drawImageTile(ctx, "pc2", 0, 1, 32, j*this.SIZE, i*this.SIZE);
          if(this.cells[i-1][j] == X && this.cells[i][j+1] == X && this.cells[i+1][j] == X) this.imageLib.drawImageTile(ctx, "pc2", 1, 0, 32, j*this.SIZE, i*this.SIZE);
          if(this.cells[i-1][j] == X && this.cells[i][j-1] == X && this.cells[i+1][j] == X) this.imageLib.drawImageTile(ctx, "pc2", 1, 1, 32, j*this.SIZE, i*this.SIZE);
          if(this.cells[i-1][j] == X && this.cells[i][j+1] == X && this.cells[i+1][j] != X) this.imageLib.drawImageTile(ctx, "pc2", 2, 0, 32, j*this.SIZE, i*this.SIZE);
          if(this.cells[i][j-1] == X && this.cells[i-1][j] == X && this.cells[i+1][j] != X) this.imageLib.drawImageTile(ctx, "pc2", 2, 1, 32, j*this.SIZE, i*this.SIZE);
          break;
        case 12:
          var X = 12;
          if(this.cells[i][j+1] == X && this.cells[i+1][j] == X && this.cells[i-1][j] != X) this.imageLib.drawImageTile(ctx, "pc3", 0, 0, 32, j*this.SIZE, i*this.SIZE);
          if(this.cells[i][j-1] == X && this.cells[i+1][j] == X && this.cells[i-1][j] != X) this.imageLib.drawImageTile(ctx, "pc3", 0, 1, 32, j*this.SIZE, i*this.SIZE);
          if(this.cells[i-1][j] == X && this.cells[i][j+1] == X && this.cells[i+1][j] == X) this.imageLib.drawImageTile(ctx, "pc3", 1, 0, 32, j*this.SIZE, i*this.SIZE);
          if(this.cells[i-1][j] == X && this.cells[i][j-1] == X && this.cells[i+1][j] == X) this.imageLib.drawImageTile(ctx, "pc3", 1, 1, 32, j*this.SIZE, i*this.SIZE);
          if(this.cells[i-1][j] == X && this.cells[i][j+1] == X && this.cells[i+1][j] != X) this.imageLib.drawImageTile(ctx, "pc3", 2, 0, 32, j*this.SIZE, i*this.SIZE);
          if(this.cells[i][j-1] == X && this.cells[i-1][j] == X && this.cells[i+1][j] != X) this.imageLib.drawImageTile(ctx, "pc3", 2, 1, 32, j*this.SIZE, i*this.SIZE);
          break;
        case 62:
        case 63:
        case 64:
        case 65:
        case 66:
        case 67:
        case 68:
        case 69:
        case 70:
        case 71:
        case 72:
        case 73:
        case 74:
        case 75:
        case 76:
        case 77:
        case 78:
        case 83:
        case 84:
        case 85:
        case 86:
        case 87:
        case 88:
        case 89:
        case 90:
        case 91:
        case 92:
        case 93:
        case 94:
        case 95:
        case 96:
        case 97:
        case 98:
        case 99:
          this.imageLib.drawImageTile(ctx, "chao", 0, 0, 32, j*this.SIZE, i*this.SIZE); //intervalo entre os players
          break
        case 79:
        case 80:
        case 81:
        case 82:
          this.imageLib.drawImageTile(ctx, "ponte", 0, 0, 32, j*this.SIZE, i*this.SIZE); //intervalo entre os players
          break
        default:
      }
    }
  }
}

Map.prototype.loadMap = function(map) {//Carrega o mapa de acordo com a matriz casasMapa
  for (var i = 0; i < this.cells.length; i++) {
    for (var j = 0; j < this.cells[i].length; j++) {
      this.cells[i][j] = map[i][j];
      switch (map[i][j]) {//Faz a verificação de conteúdo das casas para incluir as torres
        case 94://Inclui as 2 torres pequenas de "a"
          var a = new Sprite()
          a.SIZE = SIZE * 2;
          a.x = j * SIZE - SIZE / 2;
          a.y = i * SIZE - SIZE / 2;
          a.vx = 0;
          a.vy = 0;
          a.life = 100;
          a.destroyed = false;
          a.mover = false;
          this.a.push(a);
        break;
        case 67://Inclui as 2 torres pequenas de "b"
          var b = new Sprite()
          b.SIZE = SIZE * 2;
          b.x = j * SIZE - SIZE / 2;
          b.y = i * SIZE - SIZE / 2;
          b.vx = 0;
          b.vy = 0;
          b.life = 100;
          b.destroyed = false;
          b.mover = false;
          this.b.push(b);
        break;
        case 99://Inclui a torre principal de "a"
          var a = new Sprite()
          a.SIZE = SIZE * 3;
          a.x = j * SIZE - a.SIZE / 3;
          a.y = i * SIZE - a.SIZE / 3;
          a.vx = 0;
          a.vy = 0;
          a.life = 100;
          a.destroyed = false;
          a.mover = false;
          this.a.push(a);
        break;
        case 62://Inclui a torre principal de "b"
          var b = new Sprite()
          b.SIZE = SIZE * 3;
          b.x = j * SIZE - b.SIZE / 3;
          b.y = i * SIZE - b.SIZE / 3;
          b.vx = 0;
          b.vy = 0;
          b.life = 100;
          b.destroyed = false;
          b.mover = false;
          this.b.push(b);
        break;
        default:
      }
    }
  }
};

Map.prototype.getIndices = function (sprite) {
   var pos = {};
   pos.c = Math.floor(sprite.x/this.SIZE);
   pos.l = Math.floor(sprite.y/this.SIZE);
   return pos;
};

Map.prototype.carregaBarra = function(){
  if(a.energia < eCanvas.height){
    a.energia = a.energia + dt * 10;
  }
  if(b.energia < eCanvas.height){
    b.energia = b.energia + dt * 10;
  }
	antes = agora;
};

Map.prototype.delete = function(){
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

Map.prototype.criaPersonagem = function(linha, coluna){
  if (coluna == 7){
    var a = new Sprite()
    a.x = coluna * SIZE-SIZE/2;
    a.y = linha * SIZE;
    a.SIZE = 32;
    a.vx = 0;
    a.vy = 0;
    a.life = 100;
    a.destroyed = false;
    a.mover = true;
    this.a.push(a);
  }
  if (coluna == 31){
    var b = new Sprite()
    b.x = coluna * SIZE-SIZE/2;
    b.y = linha * SIZE;
    b.SIZE = 32;
    b.vx = 0;
    b.vy = 0;
    b.life = 100;
    b.destroyed = false;
    b.mover = true;
    this.b.push(b);
  }
}

Map.prototype.moverPersonagens = function(dt) {
  for (var i = 0; i < this.a.length; i++){
    this.a[i].movimenta(dt);
  }
  for (var i = 0; i < this.b.length; i++){
    this.b[i].movimenta(dt);
  }
}

Map.prototype.move = function(map){
  for (var i = 0; i < this.a.length; i++) {
    for (var j = 0; j < this.b.length; j++) {
      if (this.a[i].mover == true){
        var dx = this.a[i].x - this.b[j].x;
        var dy = this.a[i].y - this.b[j].y;
        var raio = Math.sqrt(
          Math.pow(dx,2)+
          Math.pow(dy,2)
        );
        if(raio<0){//Incluir o perseguir

        } else{
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
        if(raio<0){//Incluir o perseguir

        } else{
          if (this.cells[Math.ceil(this.b[i].y/SIZE)][Math.ceil(this.b[i].x/SIZE) - 1] == this.cells[Math.ceil(this.b[i].y/SIZE)][Math.ceil(this.b[i].x/SIZE)] + 1){
            this.b[i].vx = -100;
            this.b[i].vy = 0;
          } else if (this.cells[Math.ceil(this.b[i].y/SIZE) - 1][Math.ceil(this.b[i].x/SIZE)] == this.cells[Math.ceil(this.b[i].y/SIZE)][Math.ceil(this.b[i].x/SIZE)] + 1){
            this.b[i].vy = -100;
            this.b[i].vx = 0;
          }else if (this.cells[Math.ceil(this.b[i].y/SIZE) + 1][Math.ceil(this.b[i].x/SIZE)] == this.cells[Math.ceil(this.b[i].y/SIZE)][Math.ceil(this.b[i].x/SIZE)] + 1){
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
