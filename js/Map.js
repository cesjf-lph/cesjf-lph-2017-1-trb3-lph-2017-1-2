function Map(l, c) {
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
          ctx.fillRect(j * this.width, i * this.height, this.width, this.height);
          ctx.lineWidth = 3;
          ctx.strokeRect(j * this.width, i * this.height, this.width, this.height);
          break;
        case 0:
          ctx.fillStyle = 'green';
          ctx.strokeStyle = 'green';
          ctx.fillRect(j * this.width, i * this.height, this.width, this.height);
          ctx.lineWidth = 3;
          ctx.strokeRect(j * this.width, i * this.height, this.width, this.height);
          break;
        case 9:
          ctx.fillStyle = 'blue';
          ctx.strokeStyle = 'blue';
          ctx.fillRect(j * this.width, i * this.height, this.width, this.height);
          ctx.lineWidth = 3;
          ctx.strokeRect(j * this.width, i * this.height, this.width, this.height);
          break;
        case 100:
          ctx.fillStyle = 'white';
          ctx.strokeStyle = 'white';
          ctx.fillRect(j * this.width, i * this.height, this.width, this.height);
          ctx.lineWidth = 3;
          ctx.strokeRect(j * this.width, i * this.height, this.width, this.height);
          break;
        default:
          ctx.fillStyle = 'yellow';
          ctx.strokeStyle = 'yellow';
          ctx.fillRect(j * this.width, i * this.height, this.width, this.height);
          ctx.lineWidth = 3;
          ctx.strokeRect(j * this.width, i * this.height, this.width, this.height);
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
          this.imageLib.drawImageTile(ctx, "chao", 0, 0, 32, j*this.SIZE, i*this.SIZE); //desenha chao
          break;
        case 9:
          this.imageLib.drawImageTile(ctx, "intervalo", 0, 0, 32, j*this.SIZE, i*this.SIZE); //intervalo entre os players
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
          a.width = largura * 2;
          a.height = altura * 2;
          a.x = i * largura - a.width/2;
          a.y = j * altura - a.height/2;
          a.vx = 0;
          a.vy = 0;
          a.life = 100;
          this.a.push(a);
        break;
        case 67://Inclui as 2 torres pequenas de "b"
          var b = new Sprite()
          b.width = largura * 2;
          b.height = altura * 2;
          b.x = i * largura - b.width/2;
          b.y = j * altura - b.height/2;
          b.vx = 0;
          b.vy = 0;
          b.life = 100;
          this.b.push(b);
        break;
        case 99://Inclui a torre principal de "a"
          var a = new Sprite()
          a.width = largura * 3;
          a.height = altura * 3;
          a.x = i * largura - a.width/2;
          a.y = j * altura - a.height/2;
          a.vx = 0;
          a.vy = 0;
          a.life = 100;
          this.a.push(a);
        break;
        case 62://Inclui a torre principal de "b"
          var b = new Sprite()
          b.width = largura * 3;
          b.height = altura * 3;
          b.x = i * largura - b.width/2;
          b.y = j * altura - b.height/2;
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
   pos.c = Math.floor(sprite.x/this.width);
   pos.l = Math.floor(sprite.y/this.height);
   return pos;
};
