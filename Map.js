function Map(l, c) {
  this.SIZE = 32;
  this.cells = [];
  this.enemies = [];

  for (var i = 0; i < l; i++) {
    this.cells[i] = [];
    for (var j = 0; j < c; j++) {
      this.cells[i][j] = 0;
    }
  }
}