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
    {key: "personagem", row: 11, col: 0, colMax:  7, time:  8},
    {key: "personagem", row: 10, col: 0, colMax:  7, time:  8},
    {key: "personagem", row:  9, col: 0, colMax:  7, time:  8},
    {key: "personagem", row:  8, col: 0, colMax:  7, time:  8},
    {key: "personagem", row: 11, col: 0, colMax:  0, time:  8},
    {key: "personagem", row: 10, col: 0, colMax:  0, time:  8},
    {key: "personagem", row:  9, col: 0, colMax:  0, time:  8},
    {key: "personagem", row:  8, col: 0, colMax:  0, time: 16},
    {key: "personagem", row: 19, col: 0, colMax: 12, time: 16},
    {key: "personagem", row: 18, col: 0, colMax: 12, time: 16},
    {key: "personagem", row: 17, col: 0, colMax: 12, time: 16},
    {key: "personagem", row: 16, col: 0, colMax: 12, time:  8},
    {key: "personagem", row: 19, col: 0, colMax:  0, time:  8},
    {key: "personagem", row: 18, col: 0, colMax:  0, time:  8},
    {key: "personagem", row: 17, col: 0, colMax:  0, time:  8},
    {key: "personagem", row: 16, col: 0, colMax:  0, time:  8},
  ]
}

Sprite.prototype.desenharPose = function(ctx) {
  ctx.fillStyle = "black";
  ctx.globalAlpha = 0.4;
  ctx.beginPath();
  ctx.arc(this.x, this.y + 3, this.SIZE / 2, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1;
  /*this.imageLib.drawImageTile(ctx,
    this.poses[this.pose].key,
    this.poses[this.pose].row,
    this.poses[this.pose].col + Math.floor(this.frame),
    64,
    this.x - 32, this.y - 53
  );*/
};

Sprite.prototype.desenharLimites = function(ctx) {//Função que desenha os limites dos personagens
  ctx.fillStyle = "blue";
  ctx.fillRect(
    this.x-this.SIZE/2,
    this.y-this.SIZE/2,
    this.SIZE, this.SIZE
  );
  ctx.strokeStyle = "darkgrey";
  ctx.strokeRect(
    this.x-this.SIZE/2,
    this.y-this.SIZE/2,
    this.SIZE, this.SIZE
  );
};

Sprite.prototype.movimenta = function(dt) {//Função que movimenta os personagens
  this.x = this.x + this.vx * dt;
  this.y = this.y + this.vy * dt;
};

Sprite.prototype.colidiuCom = function(alvo){//Função que testa colisão dos personagens
  if(this.y+(this.SIZE/2) < alvo.y-(alvo.SIZE/2)) return false;
  if(this.y-(this.SIZE/2) > alvo.y+(alvo.SIZE/2)) return false;
  if(this.x+(this.SIZE/2) < alvo.x-(alvo.SIZE/2)) return false;
  if(this.x-(this.SIZE/2) > alvo.x+(alvo.SIZE/2)) return false;
  return true;
}
