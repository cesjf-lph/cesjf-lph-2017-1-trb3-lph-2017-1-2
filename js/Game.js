var eCanvas;
var ctx;
var antes = new Date();
var agora = new Date();
var dt = 0;
var auxiliar = 0; //Variável qua auxilia no status do jogo
var mapa;
var pc;
var imglib;
var soundlib;
var linhas = 17; //Fixa a quantidade de linhas
var colunas = 34; //Fixa a quantidade de colunas
var largura = 32; //Fixa a largura de cada quadro
var altura = 32; //Fixa a altura de cada quadro
var casasMapa = ([
  [100, 5,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  6,  9,  9,  5,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2, 6, 100],
  [100, 1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  3,  9,  9,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 3, 100],
  [100, 1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  3,  9,  9,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 3, 100],
  [100, 1,  0, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67,  0, 3, 100],
  [100, 1,  0, 95,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  3,  9,  9,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 66,  0, 3, 100],
  [100, 1,  0, 96,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  3,  9,  9,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 65,  0, 3, 100],
  [100, 1,  0, 97,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  3,  9,  9,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 64,  0, 3, 100],
  [100, 1,  0, 98,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  3,  9,  9,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 63,  0, 3, 100],
  [100, 1,  0, 99,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  3,  9,  9,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 62,  0, 3, 100],
  [100, 1,  0, 98,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  3,  9,  9,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 63,  0, 3, 100],
  [100, 1,  0, 97,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  3,  9,  9,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 64,  0, 3, 100],
  [100, 1,  0, 96,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  3,  9,  9,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 65,  0, 3, 100],
  [100, 1,  0, 95,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  3,  9,  9,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 66,  0, 3, 100],
  [100, 1,  0, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67,  0, 3, 100],
  [100, 1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  3,  9,  9,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 3, 100],
  [100, 1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  3,  9,  9,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 3, 100],
  [100, 8,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  7,  9,  9,  8,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4, 7, 100],
]);


function init(){
    eCanvas = document.getElementsByTagName("canvas")[0];
    eCanvas.width = largura * colunas;//Largura de cada quadro vezes o número de colunas
    eCanvas.height = altura * linhas;//Altura de cada quadro vezes o número de linhas
    ctx  = eCanvas.getContext("2d");

    soundLib = new SoundLoader();

    imglib = new ImageLoader();
    imglib.load("chao", "img/chao.png");
    imglib.load("intervalo", "img/intervalo.png");

    mapa = new Map(linhas, colunas);
    mapa.imageLib = imglib;
    mapa.loadMap(casasMapa);
    mapa.width = eCanvas.width / colunas;
    mapa.height = eCanvas.height / linhas;
    a = new Sprite();
    a.imageLib = imglib;
    a.energia = eCanvas.height;//Fixa a energia com o mesmo valor da altura para simplificar no desenho
    b = new Sprite();
    b.imageLib = imglib;
    b.energia = eCanvas.height;//Fixa a energia com o mesmo valor da altura para simplificar no desenho
    configuraControles();
    var id = requestAnimationFrame(passo);
}

function passo(){
  	id = requestAnimationFrame(passo);
  	agora = new Date();
  	dt = (agora - antes) / 1000;
  	ctx.clearRect(0, 0, eCanvas.width, eCanvas.height);
    mapa.desenhar(ctx);
    informacoes();
  	antes = agora;
}

function configuraControles() {
  addEventListener("keydown", function(e) {
    switch (e.keyCode) {
      case 0:
        e.preventDefault();
        break;
      default:
    }
  });
  addEventListener("keyup", function(e) {
    switch (e.keyCode) {
      case 0:
        e.preventDefault();
        break;
      default:
    }
  });
}

function textoFormatado(texto1, texto2, texto3, texto4, texto5, texto6, texto7, texto8, texto9, texto10){
  ctx.textAlign="center";
  ctx.fillStyle = "red";
  ctx.font = "3em Arial Black";
  ctx.fillText(texto1, eCanvas.width / 2, eCanvas.height / 2-20);
  ctx.fillStyle = "white";
  ctx.font = "1em Arial Black";
  ctx.fillText(texto2, eCanvas.width / 2, eCanvas.height / 2);
  ctx.fillText(texto3, eCanvas.width / 2, eCanvas.height / 2 + 20);
  ctx.fillText(texto4, eCanvas.width / 2, eCanvas.height / 2 + 40);
  ctx.fillStyle = "white";
  ctx.font = "0.75em Arial Black";
  ctx.fillText(texto5, eCanvas.width / 2, eCanvas.height / 2 + 55);
  ctx.fillText(texto6, eCanvas.width / 2, eCanvas.height / 2 + 70);
  ctx.fillText(texto7, eCanvas.width / 2, eCanvas.height / 2 + 85);
  ctx.fillText(texto8, eCanvas.width / 2, eCanvas.height / 2 + 100);
  ctx.fillText(texto9, eCanvas.width / 2, eCanvas.height / 2 + 115);
  ctx.fillText(texto10, eCanvas.width / 2, eCanvas.height / 2 + 130);
}

function informacoes(){
  ctx.fillStyle = "grey";
  ctx.fillRect (0 * largura, eCanvas.height, largura, - eCanvas.height);
  ctx.fillStyle = "hsl("+a.energia/eCanvas.height*120+",100%,50%)";
  ctx.fillRect (0 * largura, eCanvas.height, largura, - a.energia);
  ctx.fillStyle = "grey";
  ctx.fillRect (33 * largura, eCanvas.height, largura, - eCanvas.height);
  ctx.fillStyle = "hsl("+b.energia/eCanvas.height*120+",100%,50%)";
  ctx.fillRect (33 * largura, eCanvas.height, largura, - b.energia);
}
