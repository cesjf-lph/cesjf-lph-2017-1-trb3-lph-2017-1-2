function Sprite(){
	this.x = 0;
	this.y = 0;
	this.vx = 0;
	this.vy = 0;
	this.energia = 0;
  this.SIZE = 15;
  this.frame = 0;
  this.pose = 0;
  this.imageLib;
  this.poses = [
    {key: "", row: 0, col: 0, colMax: 0, time: 0},
    ];
}

Sprite.prototype.desenharPose = function(ctx) {
  if(this.SIZE == 32){
    ctx.fillStyle = "black";
    ctx.globalAlpha = 0.4;
    ctx.beginPath();
    ctx.arc(this.x, this.y + 3, this.SIZE / 3, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;
    this.imageLib.drawImageTile(ctx,
      this.poses[this.pose].key,
      this.poses[this.pose].row,
      this.poses[this.pose].col + Math.floor(this.frame),
      64,
      this.x - 32, this.y - 53
    );
  }
	//Desenha a barra de life de cada personagem
	if (this.seletor != 5 && this.seletor != 6 && this.seletor != 10 && this.seletor != 11){
			ctx.fillStyle = "hsl("+this.life/this.lifeInicial*120+",100%,50%)";
			ctx.fillRect (this.x-this.SIZE/2, this.y+this.SIZE/2+2, this.life/this.lifeInicial*this.SIZE, 2);
	}
};

Sprite.prototype.desenharLimites = function(ctx) {//Função que desenha os limites dos personagens
  ctx.fillStyle = "gold";
  ctx.fillRect(
    this.x-this.SIZE/2,
    this.y-this.SIZE/2-17,
    this.SIZE, this.SIZE
  );
  ctx.strokeStyle = "gold";
  ctx.strokeRect(
    this.x-this.SIZE/2,
    this.y-this.SIZE/2-17,
    this.SIZE, this.SIZE
  );
};

Sprite.prototype.desenharFlecha = function(ctx) {//Função que desenha os limites dos personagens
	var angle = Math.atan(this.vy/this.vx);

	ctx.save();
	ctx.translate(this.x, this.y);
	ctx.rotate(angle);
  ctx.fillStyle = "brown";
  ctx.fillRect(
    0-16,
    0-1-17,
    32, 2
  );
	ctx.lineWidth = 1;
  ctx.strokeStyle = "black";
  ctx.strokeRect(
    0-16,
    0-1-17,
    32, 2
  );
	ctx.restore();
};

Sprite.prototype.movimenta = function(dt) {//Função que movimenta os personagens
  this.x = this.x + this.vx * dt;
  this.y = this.y + this.vy * dt;
  this.frame += this.poses[this.pose].time * dt;
  if (this.frame > this.poses[this.pose].colMax + 1) {
    this.frame = this.poses[this.pose].col;
  }
};

Sprite.prototype.colidiuCom = function(alvo){//Função que testa colisão dos personagens
  if(this.y+(this.SIZE/2) < alvo.y-(alvo.SIZE/2)) return false;
  if(this.y-(this.SIZE/2) > alvo.y+(alvo.SIZE/2)) return false;
  if(this.x+(this.SIZE/2) < alvo.x-(alvo.SIZE/2)) return false;
  if(this.x-(this.SIZE/2) > alvo.x+(alvo.SIZE/2)) return false;
  return true;
}
