function ImageLoader(){
  this.images = {};
}

ImageLoader.prototype.load = function (key, url){
  var img = new Image();
  img.src = url;
  this.images[key] = img;
}

ImageLoader.prototype.drawImage = function (ctx, key, x, y, size){
  ctx.drawImage(this.images[key], x, y, size, size);
}

ImageLoader.prototype.drawImageTile = function (ctx, key, row, col, size, x, y){
  ctx.drawImage(this.images[key],
    col*size, row*size, size, size,
    x, y, size, size
  );
}
