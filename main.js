//Constantes del juego
const COLUMNAS = 10;
const FILAS = 10;
const CANTIDAD_MINAS = 15;

//Variables con colores para los casilleros (NO se pudieron declarar como constantes ya que  la fn color sólo está definida para el setup y el draw)
var COLOR_CASILLERO_CON_MINA;
var COLOR_CASILLERO_SIN_MINA;
var COLOR_CASILLERO_MARCADO;

//Variables controladas al hacer click con el mouse: mousePressed()
var columnaPresionada;
var filaPresionada;
var hizoClick = false;

//Otras variables
var casillerosSinDescubrir = FILAS*COLUMNAS;


function setup()
{
  casillerosSinDescubrir;
  createCanvas(500, 500);   //crea un lienzo o panel donde estará el juego. El primer parámetro es el ancho y el segundo el alto del lienzo.
  laMagiaDeLosProfes();

  //Asigno colores que se utilizarán. La fn color solo está definida para el setup y el draw
  COLOR_CASILLERO_CON_MINA = color("#FF0000");
  COLOR_CASILLERO_SIN_MINA = color("#1CC932");
  COLOR_CASILLERO_MARCADO = color("#278EF2");
  ponerMinasTablero();

  // Modificar/completar
}


function draw() {
 
  if (hizoClick == true)
  {
    if(mouseButton == LEFT)
    {
      if (tieneMinaCasillero(columnaPresionada, filaPresionada) )
      {
        perder();
        mostrarMinas();
        
      }
      else
      {
        pintarCasillero(columnaPresionada, filaPresionada, COLOR_CASILLERO_SIN_MINA); //pinta el casillero clickeado. Modificar/completar
        descubrirCasillero(columnaPresionada, filaPresionada);
      }
    }
    else {
      pintarCasillero(columnaPresionada, filaPresionada, COLOR_CASILLERO_MARCADO);
    }


    hizoClick = false;  //Indico que ya "procesé" el click del usuario. NO modificar
  }
  if (ganoElJuego()==true)
    ganar();
}


function ganoElJuego()
{
  if (casillerosSinDescubrir==CANTIDAD_MINAS)
    return true; 
   else
    return false;
    //Esto hace que NUNCA gane el juego. Modificar/completar
}

function ponerMinasTablero()
{
  for (let contador = 0; contador < CANTIDAD_MINAS; contador++)
  {
    columnaAleatoria = Math.floor(Math.random() * COLUMNAS);
    filaAleatoria = Math.floor(Math.random() * FILAS);
    ponerMinaCasillero(columnaAleatoria, filaAleatoria);

    console.log("Puse una mina en columna: " + columnaAleatoria + " y fila " + filaAleatoria);
  }
    //for
    //1 mina
    //necesito 2 numeros aleatorios  (fila y columna donde pondrá la mina)
    //random
    //ponerMinaCasillero(columnaRandom, filaRandom);
}

function mostrarMinas()
{
  for (let fil = 0; fil < FILAS; fil++){
    for (let col = 0; col < COLUMNAS; col++){
      if (tieneMinaCasillero(col, fil))
        pintarCasillero(col, fil, COLOR_CASILLERO_CON_MINA)
    }
  }  
}

function contarMinasAlrededor(columna, fila)
{
  let contadorMinas = 0;

  // Recorre los 8 casilleros adyacentes al casillero dado
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      // Calcula la columna y la fila del casillero adyacente
      const columnaAdyacente = columna + dx;
      const filaAdyacente = fila + dy;

      // Si el casillero adyacente está dentro del tablero
      if (columnaAdyacente >= 0 && columnaAdyacente < COLUMNAS && filaAdyacente >= 0 && filaAdyacente < FILAS) {
        // Si el casillero adyacente tiene una mina, aumenta el contador de minas
        if (tieneMinaCasillero(columnaAdyacente, filaAdyacente)) {
          contadorMinas++;
        }
      }
    }
  }

  return contadorMinas;
}