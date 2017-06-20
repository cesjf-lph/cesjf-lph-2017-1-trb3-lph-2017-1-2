function Sprite(){
	this.x = 0;
	this.y = 0;
	this.vx = 0;
	this.vy = 0;
	this.energia = 0;
}

Sprite.prototype.desenharLimites = function(ctx) {
  ctx.fillStyle = "blue";
  ctx.fillRect(
    this.x,
    this.y,
    this.SIZE, this.SIZE
  );
  ctx.strokeStyle = "darkgrey";
  ctx.strokeRect(
    this.x,
    this.y,
    this.SIZE, this.SIZE
  );
};

Sprite.prototype.movimenta = function(dt) {
  this.x = this.x + this.vx * dt;
  this.y = this.y + this.vy * dt;
};
