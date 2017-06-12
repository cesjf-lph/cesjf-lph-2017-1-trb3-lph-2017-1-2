function SoundLoader() {
  this.sons = {};
  this.canais = [];
  this.MAX = 20;

  for (var i = 0; i < this.MAX; i++) {
    this.canais[i] = {
      fim: -1,
      audio: new Audio()
    };
  }
}

SoundLoader.prototype.load = function(key, url) {
  this.sons[key] = new Audio();
  this.sons[key].src = url;
  this.sons[key].load();
};


SoundLoader.prototype.play = function(key) {
  var agora = (new Date()).getTime();
  for (var i = 0; i < this.MAX; i++) {
    if (this.canais[i].fim < agora) {
      this.canais[i].audio.src = this.sons[key].src;
      this.canais[i].fim = agora + 1000 * this.sons[key].duration;
      this.canais[i].audio.play();
      break;
    }
  }
};
