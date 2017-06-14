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
  this.desenharLimites(ctx);
  this.desenharTiles(ctx);
  for (var i = 0; i < this.a.length; i++) {//Chama o desenho do "a"
  }
  for (var i = 0; i < this.b.length; i++) {//Chama o desenho do "b"
  }
}

Map.prototype.desenharLimites = function(ctx) {//Desnhanha estrutura do mapa
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
          a.x = i * SIZE - a.SIZE/2;
          a.y = j * SIZE - a.SIZE/2;
          a.vx = 0;
          a.vy = 0;
          a.life = 100;
          this.a.push(a);
        break;
        case 67://Inclui as 2 torres pequenas de "b"
          var b = new Sprite()
          b.SIZE = SIZE * 2;
          b.x = i * SIZE - b.SIZE/2;
          b.y = j * SIZE - b.SIZE/2;
          b.vx = 0;
          b.vy = 0;
          b.life = 100;
          this.b.push(b);
        break;
        case 99://Inclui a torre principal de "a"
          var a = new Sprite()
          a.SIZE = SIZE * 3;
          a.x = i * SIZE - a.SIZE/2;
          a.y = j * SIZE - a.SIZE/2;
          a.vx = 0;
          a.vy = 0;
          a.life = 100;
          this.a.push(a);
        break;
        case 62://Inclui a torre principal de "b"
          var b = new Sprite()
          b.SIZE = SIZE * 3;
          b.x = i * SIZE - b.SIZE/2;
          b.y = j * SIZE - b.SIZE/2;
          b.vx = 0;
          b.vy = 0;
          b.life = 100;
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
