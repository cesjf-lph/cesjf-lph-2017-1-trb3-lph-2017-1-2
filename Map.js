function Map(l, c) {
  this.SIZE = 32;
  this.cells = [];
  this.enemies = [];
  this.imageLib = null;

  for (var i = 0; i < l; i++) {
    this.cells[i] = [];
    for (var j = 0; j < c; j++) {
      this.cells[i][j] = 0;
    }
  }
}

Map.prototype.desenhar = function(ctx){
  this.desenharLimites(ctx);
}

Map.prototype.desenharLimites = function(ctx) {
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
          ctx.fillStyle = 'red';
          ctx.strokeStyle = 'red';
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
        case 64:
        case 69:
        case 94:
        case 99:
          ctx.fillStyle = 'grey';
          ctx.strokeStyle = 'grey';
          ctx.fillRect(j * this.width, i * this.height, this.width, this.height);
          ctx.lineWidth = 3;
          ctx.strokeRect(j * this.width, i * this.height, this.width, this.height);
          break;
        default:
          ctx.fillStyle = 'yellow';
          ctx.fillRect(j * this.width, i * this.height, this.width, this.height);
      }
    }
  }
};

Map.prototype.loadMap = function(map) {
  for (var i = 0; i < this.cells.length; i++) {
    for (var j = 0; j < this.cells[i].length; j++) {
      this.cells[i][j] = map[i][j];
    }
  }
};

Map.prototype.getIndices = function (sprite) {
   var pos = {};
   pos.c = Math.floor(sprite.x/this.SIZE);
   pos.l = Math.floor(sprite.y/this.SIZE);
   return pos;
};
