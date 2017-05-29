var eCanvas;
var ctx;
var antes = new Date();
var agora = new Date();
var dt = 0;
var fps = 0;

function init(){
    eCanvas = document.getElementsByTagName("canvas")[0];
    eCanvas.width = 600;
    eCanvas.height = 480;
    ctx  = eCanvas.getContext("2d");    
    var id = requestAnimationFrame(passo);
}

function passo(){
  	id = requestAnimationFrame(passo);
  	agora = new Date();
  	dt = (agora - antes) / 1000;
  	ctx.clearRect(0, 0, eCanvas.width, eCanvas.height);      
  	antes = agora;
}