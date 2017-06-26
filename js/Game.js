var eCanvas;
var ctx;
var antes = new Date();
var agora = new Date();
var dt = 0;
var auxiliar = 0; //Variável qua auxilia no status do jogo, se 0 tela inicial, se 1 está em jogo, se 2 está pausado, se 3 A ganhou, se 4 B ganhou, se 5 tela de instruções
var mapa;
var imglib;
var soundlib;
var linhas = 18; //Fixa a quantidade de linhas
var colunas = 38; //Fixa a quantidade de colunas
var SIZE = 32; //Fixa a altura e largura de cada quadro
var casasMapa = ([
  [100, 100, 100,100, 100, 100,100, 100, 100,100, 100, 100,100, 100, 100,100, 100, 100,100, 100, 100,100, 100, 100,100, 100, 100,100, 100, 100,100, 100, 100,100, 100, 100,100, 100, 100, 100, 100, 100],
  [100, 100, 100, 5,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  6,  9,  9,  5,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2, 6, 100, 100, 100],
  [100, 100, 100, 1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  3,  9,  9,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 3, 100, 100, 100],
  [ 10, 100, 100, 1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  3,  9,  9,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 3, 100,  15, 100],
  [100, 100, 100, 1,  0, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67,  0, 3, 100, 100, 100],
  [100, 100, 100, 1,  0, 95,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  3,  9,  9,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 66,  0, 3, 100, 100, 100],
  [ 11, 100, 100, 1,  0, 96,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  3,  9,  9,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 65,  0, 3, 100,  16, 100],
  [100, 100, 100, 1,  0, 97,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  3,  9,  9,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 64,  0, 3, 100, 100, 100],
  [100, 100, 100, 1,  0, 98,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  3,  9,  9,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 63,  0, 3, 100, 100, 100],
  [ 12, 100, 100, 1,  0, 99,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  3,  9,  9,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 62,  0, 3, 100,  17, 100],
  [100, 100, 100, 1,  0, 98,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  3,  9,  9,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 63,  0, 3, 100, 100, 100],
  [100, 100, 100, 1,  0, 97,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  3,  9,  9,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 64,  0, 3, 100, 100, 100],
  [ 13, 100, 100, 1,  0, 96,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  3,  9,  9,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 65,  0, 3, 100,  18, 100],
  [100, 100, 100, 1,  0, 95,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  3,  9,  9,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 66,  0, 3, 100, 100, 100],
  [100, 100, 100, 1,  0, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67,  0, 3, 100, 100, 100],
  [ 14, 100, 100, 1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  3,  9,  9,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 3, 100,  19, 100],
  [100, 100, 100, 1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  3,  9,  9,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 3, 100, 100, 100],
  [100, 100, 100, 8,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  7,  9,  9,  8,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4, 7, 100, 100, 100],
]);/*Casas 100: Espaços em branco para inclusão de informações (Barra de energia e cards)./ Campos 1, 2, 3, 4, 5, 6, 7 e 8: campos com imagens de bordas /
Campos 9: Campos com o riacho / Campos 79, 80, 81 e 82: compõe a ponte / Campos 0: Campos com o gramado //
Campos de 62 a 99: Campos onde o personagem pode percorrer // Campos 94: Campos onde serão posicionada as torres pequenas de "a" /
Campo 99: Campo onde será posicionada a torre principal de "a" / Campos 67: Campos onde serão posicionadas as pequenas torres de "b" /
Campo 62: Campo onde será posicionada a torre principal de "b", Casas 10, 11, 12, 13, 14, 15, 16, 17, 18 e 19: campos com os cards de personagens*/

function init(){
    eCanvas = document.getElementsByTagName("canvas")[0];
    eCanvas.width = SIZE * colunas;//Largura de cada quadro vezes o número de colunas
    eCanvas.height = SIZE * linhas;//Altura de cada quadro vezes o número de linhas
    ctx  = eCanvas.getContext("2d");

    soundLib = new SoundLoader();//Vincula os sons
    soundLib.load("select", "mp3/select.mp3");
    soundLib.load("buble", "mp3/buble.mp3");
    soundLib.load("explosion", "mp3/explosion.mp3");
    soundLib.load("Ta-Da", "mp3/Ta-da.mp3");
    soundLib.load("dying", "mp3/dying.mp3");
    soundLib.load("punch-on", "mp3/punch-on.mp3");
    soundLib.load("punch-off", "mp3/punch-off.mp3");
    soundLib.load("alert", "mp3/alert.mp3");
    soundLib.load("criar", "mp3/rider_charge_03.mp3");

    imglib = new ImageLoader();//Vincula as imagens
    imglib.load("chao", "img/chao.png");
    imglib.load("0", "img/0.png");
    imglib.load("1", "img/1.png");
    imglib.load("2", "img/2.png");
    imglib.load("3", "img/3.png");
    imglib.load("3", "img/3.png");
    imglib.load("4", "img/4.png");
    imglib.load("5", "img/5.png");
    imglib.load("6", "img/6.png");
    imglib.load("7", "img/7.png");
    imglib.load("8", "img/8.png");
    imglib.load("9", "img/9.png");
    imglib.load("10", "img/10.png");
    imglib.load("11", "img/11.png");
    imglib.load("12", "img/12.png");
    imglib.load("13", "img/13.png");
    imglib.load("14", "img/14.png");
    imglib.load("15", "img/15.png");
    imglib.load("16", "img/16.png");
    imglib.load("17", "img/17.png");
    imglib.load("18", "img/18.png");
    imglib.load("19", "img/19.png");
    imglib.load("79", "img/79.png");
    imglib.load("80", "img/80.png");
    imglib.load("81", "img/81.png");
    imglib.load("82", "img/82.png");
    imglib.load("tower", "img/tower.png");
    imglib.load("castle", "img/castle.png");
    imglib.load("personagem0", "Personagens x cartas/1.png");
    imglib.load("personagem1", "Personagens x cartas/2.png");
    imglib.load("personagem2", "Personagens x cartas/3.png");
    imglib.load("personagem3", "Personagens x cartas/4.png");
    imglib.load("personagem4", "Personagens x cartas/5.png");
    imglib.load("personagem5", "Personagens x cartas/6.png");
    imglib.load("personagem6", "Personagens x cartas/7.png");
    imglib.load("personagem7", "Personagens x cartas/8.png");
    imglib.load("personagem8", "Personagens x cartas/9.png");
    imglib.load("personagem9", "Personagens x cartas/10.png");
    imglib.load("personagem10", "personagens/king.png");
    imglib.load("personagem11", "personagens/princesa.png");


    mapa = new Map(linhas, colunas);
    mapa.imageLib = imglib;
    mapa.loadMap(casasMapa);

    a = new Sprite();
    a.imageLib = imglib;
    a.energia = eCanvas.height;//Fixa a energia com o mesmo valor da altura para simplificar no desenho
    a.seletor = 0;
    a.atiraA1 = true;//Condiciona "a" a atirar da torre superior
    a.atiraA2 = true;//Condiciona "a" a atirar da torre inferior
    b = new Sprite();
    b.imageLib = imglib;
    b.energia = eCanvas.height;//Fixa a energia com o mesmo valor da altura para simplificar no desenho
    b.seletor = 0;
    b.atiraB1 = true;//Condiciona "b" a atirar da torre superior
    b.atiraB2 = true;//Condiciona "b" a atirar da torre inferior

    configuraControles();
    window.onmousedown = configuraMouse;
    var id = requestAnimationFrame(passo);
}

function passo(){
  	id = requestAnimationFrame(passo);
  	agora = new Date();
  	dt = (agora - antes) / 1000;
    eCanvas.style.border = "5px solid black";
  	ctx.clearRect(0, 0, eCanvas.width, eCanvas.height);
    tela(ctx);
    if(auxiliar == 1){
      mapa.desenhar(ctx);
      mapa.moverPersonagens(mapa, dt);
      mapa.testarColisao();
      mapa.testaRaio();
      mapa.moverFlechas(dt);
      mapa.paraAtirador();
      mapa.testarColisaoFlechas();
      mapa.atualizaDados();
    }
  	antes = agora;
}

function configuraControles() {
  addEventListener("keydown", function(e) {
    switch (e.keyCode) {
      case 38:
        if (b.seletor > 0){
          b.seletor = b.seletor - 1;
          soundLib.play("select");
        }
        e.preventDefault();
        break;
      case 40:
        if (b.seletor < 4){
          b.seletor = b.seletor + 1;
          soundLib.play("select");
        }
        e.preventDefault();
        break;
      case 87:
        if (a.seletor > 0){
          a.seletor = a.seletor - 1;
          soundLib.play("select");
        }
        e.preventDefault();
        break;
      case 83:
        if (a.seletor < 4){
          a.seletor = a.seletor + 1;
          soundLib.play("select");
        }
        e.preventDefault();
        break;
      case 68:
        if (a.atiraA2 == true){
          if (a.energia > 50+100/(a.seletor+1) && auxiliar == 1){//Condiciona o lançamento a ter energia suficiente e o jogo estar em execução
            mapa.criaPersonagem(14, 7, a.seletor);//(Linha, coluna) Se linha = 3 cria personagem na parte superior, se linha = 13 cria personagem na parte inferior, se coluna = 7 cria personagem de "a", se coluna = 30 cria personagem de "b"
            a.energia = a.energia - (50+100/(a.seletor+1));//Controla o consumo de energia
            soundLib.play("criar");
          }
        }else{
          if (a.energia > 50+100/(a.seletor+1) && auxiliar == 1){//Condiciona o lançamento a ter energia suficiente e o jogo estar em execução
            mapa.criaPersonagem(11, 5, a.seletor);//(Linha, coluna) Se linha = 3 cria personagem na parte superior, se linha = 13 cria personagem na parte inferior, se coluna = 7 cria personagem de "a", se coluna = 30 cria personagem de "b"
            a.energia = a.energia - (50+100/(a.seletor+1));//Controla o consumo de energia
            soundLib.play("criar");
          }
        }
        e.preventDefault();
        break;
      case 65:
        if (a.atiraA1 == true){
          if (a.energia >  50+100/(a.seletor+1) && auxiliar == 1){//Condiciona o lançamento a ter energia suficiente e o jogo estar em execução
            mapa.criaPersonagem(4, 7, a.seletor);//(Linha, coluna) Se linha = 3 cria personagem na parte superior, se linha = 13 cria personagem na parte inferior, se coluna = 7 cria personagem de "a", se coluna = 30 cria personagem de "b"
            a.energia = a.energia - (50+100/(a.seletor+1));//Controla o consumo de energia
            soundLib.play("criar");
          }
        }else{
          if (a.energia >  50+100/(a.seletor+1) && auxiliar == 1){//Condiciona o lançamento a ter energia suficiente e o jogo estar em execução
            mapa.criaPersonagem(6, 5, a.seletor);//(Linha, coluna) Se linha = 3 cria personagem na parte superior, se linha = 13 cria personagem na parte inferior, se coluna = 7 cria personagem de "a", se coluna = 30 cria personagem de "b"
            a.energia = a.energia - (50+100/(a.seletor+1));//Controla o consumo de energia
            soundLib.play("criar");
          }
        }
        e.preventDefault();
        break;
      case 37:
        if (b.atiraB2 == true){
          if (b.energia >  50+100/(b.seletor+1) && auxiliar == 1){//Condiciona o lançamento a ter energia suficiente e o jogo estar em
            mapa.criaPersonagem(14, 30, b.seletor);//(Linha, coluna) Se linha = 3 cria personagem na parte superior, se linha = 13 cria personagem na parte inferior, se coluna = 7 cria personagem de "a", se coluna = 30 cria personagem de "b"
            b.energia = b.energia - (50+100/(b.seletor+1));//Controla o consumo de energia
            soundLib.play("criar");
          }
        }else{
          if (b.energia >  50+100/(b.seletor+1) && auxiliar == 1){//Condiciona o lançamento a ter energia suficiente e o jogo estar em
            mapa.criaPersonagem(11, 32, b.seletor);//(Linha, coluna) Se linha = 3 cria personagem na parte superior, se linha = 13 cria personagem na parte inferior, se coluna = 7 cria personagem de "a", se coluna = 30 cria personagem de "b"
            b.energia = b.energia - (50+100/(b.seletor+1));//Controla o consumo de energia
            soundLib.play("criar");
          }
        }
        e.preventDefault();
        break;
      case 39:
        if (b.atiraB1 == true){
          if (b.energia >  50+100/(b.seletor+1) && auxiliar == 1){//Condiciona o lançamento a ter energia suficiente e o jogo estar em
            mapa.criaPersonagem(4, 30, b.seletor);//(Linha, coluna) Se linha = 3 cria personagem na parte superior, se linha = 13 cria personagem na parte inferior, se coluna = 7 cria personagem de "a", se coluna = 30 cria personagem de "b"
            b.energia = b.energia - (50+100/(b.seletor+1));//Controla o consumo de energia
            soundLib.play("criar");
          }
        }else{
          if (b.energia >  50+100/(b.seletor+1) && auxiliar == 1){//Condiciona o lançamento a ter energia suficiente e o jogo estar em
            mapa.criaPersonagem(6, 32, b.seletor);//(Linha, coluna) Se linha = 3 cria personagem na parte superior, se linha = 13 cria personagem na parte inferior, se coluna = 7 cria personagem de "a", se coluna = 30 cria personagem de "b"
            b.energia = b.energia - (50+100/(b.seletor+1));//Controla o consumo de energia
            soundLib.play("criar");
          }
        }
        e.preventDefault();
        break;
      case 73:
      	if(auxiliar == 1){
      	  soundLib.play("buble");
          auxiliar = 5;
        }else if(auxiliar == 5){
          ctx.globalAlpha = 1;
          antes = new Date();
          requestAnimationFrame(passo);
          soundLib.play("buble");
          auxiliar = 1;
      	}
      	e.preventDefault();
      	break;
      case 80:
        if(auxiliar == 1){
          soundLib.play("buble");
          auxiliar = 2;
        }else if(auxiliar == 2){
          ctx.globalAlpha = 1;
          antes = new Date();
          requestAnimationFrame(passo);
          soundLib.play("buble");
          auxiliar = 1;
        }
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

function configuraMouse(e) {
  e = e || window.event;
  var button = e.which || e.button;
  if(button == 1 && auxiliar == 0) {
    auxiliar = 1;

    mapa.criaPersonagem(4, 5, 11);
    mapa.criaPersonagem(14, 5, 11);

    mapa.criaPersonagem(4, 32, 6);
    mapa.criaPersonagem(14, 32, 6);


    mapa.criaPersonagem(9, 5, 10);
    mapa.criaPersonagem(9, 32, 5);
  } else if(button == 2) {
    console.log("Botão de rolagem");
  } else if(button == 3) {
    console.log("Botão direito");
  }
};

function tela(ctx){
  if(auxiliar == 0){
    var telaInicial = new Image();
    telaInicial.src = "img/logo.png";
    ctx.drawImage(telaInicial, 0, 0, 1216, 576);
  }
  if(auxiliar == 2){
    var texto = "Jogo Pausado! ";
    ctx.fillStyle = "green";
    ctx.strokeStyle = "yellow";
    ctx.globalAlpha = 0.50;
    ctx.fillRect(0, 0, eCanvas.width, eCanvas.height);
    ctx.font = "3em fantasy";
    ctx.fillStyle = "blue";
    ctx.fillText(texto, (eCanvas.width / 2), (eCanvas.height / 2));
    ctx.strokeText(texto, (eCanvas.width / 2), (eCanvas.height / 2));
    cancelAnimationFrame(id);
  }
  if(auxiliar == 3){
    var texto = "Jogador A venceu!! ";
    ctx.fillStyle = "green";
    ctx.strokeStyle = "yellow";
    ctx.globalAlpha = 0.50;
    ctx.fillRect(0, 0, eCanvas.width, eCanvas.height);
    ctx.font = "3em fantasy";
    ctx.fillStyle = "blue";
    ctx.fillText(texto, (eCanvas.width / 2), (eCanvas.height / 2));
    ctx.strokeText(texto, (eCanvas.width / 2), (eCanvas.height / 2));
    cancelAnimationFrame(id);
  }
  if(auxiliar == 4){
    var texto = "Jogador B venceu!! ";
    ctx.fillStyle = "green";
    ctx.strokeStyle = "yellow";
    ctx.globalAlpha = 0.50;
    ctx.fillRect(0, 0, eCanvas.width, eCanvas.height);
    ctx.font = "3em fantasy";
    ctx.fillStyle = "blue";
    ctx.fillText(texto, (eCanvas.width / 2), (eCanvas.height / 2));
    ctx.strokeText(texto, (eCanvas.width / 2), (eCanvas.height / 2));
    cancelAnimationFrame(id);
  }
  if (auxiliar == 5){
      var texto = "Instruções do jogo ";
      ctx.fillStyle = "green";
      ctx.strokeStyle = "yellow";
      ctx.globalAlpha = 0.50;
      ctx.fillRect(0, 0, eCanvas.width, eCanvas.height);
      ctx.font = "3em fantasy";
      ctx.fillStyle = "blue";
      ctx.fillText(texto, (eCanvas.width / 2), (eCanvas.height / 2));
      ctx.strokeText(texto, (eCanvas.width / 2), (eCanvas.height / 2));
      cancelAnimationFrame(id);
    }
}


/*Tela de Seleção de Cartas:

  var casasMapa = ([
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0,10, 0, 0,10, 0, 0,10, 0, 0,10, 0, 0, 0, 0, 0, 0, 0, 0, 0,10, 0, 0,10, 0, 0,10, 0, 0,10, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0,10, 0, 0,10, 0, 0,10, 0, 0,10, 0, 0, 0, 0, 0, 0, 0, 0, 0,10, 0, 0,10, 0, 0,10, 0, 0,10, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0,10, 0, 0,10, 0, 0,10, 0, 0,10, 0, 0, 0, 0, 0, 0, 0, 0, 0,10, 0, 0,10, 0, 0,10, 0, 0,10, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0,10, 0, 0,10, 0, 0,10, 0, 0,10, 0, 0, 0, 0, 0, 0, 0, 0, 0,10, 0, 0,10, 0, 0,10, 0, 0,10, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ]);*/
