
class Tetrimino{
    constructor(_nombre = random(["Z","I","J","L","O","T","S"])){
        this.nombre = _nombre
        let tetriminoBase = tetriminosBase[_nombre];
        this.color = tetriminoBase.color;
        this.mapa = []
        for (const pmino of tetriminoBase.mapa){
            this.mapa.push(pmino.copy()); // copy es metodo de p5.js
        }
        this.posicion= createVector(tablero.columnas/2,0); //createVector es  p5.js
    }


    moverDerecha(){
        this.posicion.x += 1;
        if(this.movimientoErroneo){
            this.moverIzquierda();
            
        }
    }
    moverIzquierda(){
        this.posicion.x -= 1;
        if(this.movimientoErroneo){
            this.moverDerecha();
        }
    }
    moverAbajo(){
        this.posicion.y += 1;
        if(this.movimientoErroneo){
            this.posicion.y --;
            tablero.almacenarMinos = this
            tetrimino = new Tetrimino();
        }
    }

    girar(){
        for (const pmino of this.mapa) {
            pmino.set(pmino.y, -pmino.x);
        }
        if(this.movimientoErroneo){
            this.desgirar();
        }
    }

    desgirar(){
        for (const pmino of this.mapa) {
            pmino.set(-pmino.y, pmino.x);
        }
    }

    

    get movimientoErroneo(){
        let salioDelTablero = !this.estaDentroDelTablero;
        return salioDelTablero || this.colisionConMinosAlmacenados;
    }

    get estaDentroDelTablero(){
            for (const pmino of this.mapaTablero) {
                if(pmino.x < 0){ // Evita la salida por izquierda
                    return false
                }
                if(pmino.x >= tablero.columnas){ //Evita que salga por derecha 
                    return false
                }
                if(pmino.y >= tablero.filas){ // Evita que salga por abajo
                    return false
                }
            }
            return true;
    }

    get colisionConMinosAlmacenados(){
        for (const pmino of this.mapaTablero) {
                if (tablero.minosAlmacenados[pmino.x][pmino.y]) {
                    return true
                }
        }
        return false    
    }

    get mapaTablero(){
        let retorno = [];
        for (const pmino of this.mapa) {
            let copy = pmino.copy().add(this.posicion) //add es p5.js
            retorno.push(copy) 
        }
        return retorno;
    }

    get mapaCanvas(){
        let retorno = [];
        for (const pmino of this.mapa) {
            let copy = pmino.copy().add(this.posicion)  //add es p5.js
            retorno.push(tablero.coordenada(copy.x,copy.y)) 
        }
        return retorno;
    }

    dibujar(){
        push();
        fill(this.color);
        for (const pmino of this.mapaCanvas){
            Tetrimino.dibujarMino(pmino);
        }
        pop();
    }

    static dibujarMino(pmino){
        rect(pmino.x, pmino.y, tablero.lado_celda); // rect es p5.js
        push();
        noStroke();
        fill(255,255,255,80);
        beginShape();
        vertex(pmino.x, pmino.y);
        vertex(pmino.x + tablero.lado_celda, pmino.y)
        vertex(pmino.x + tablero.lado_celda, pmino.y + tablero.lado_celda);
        endShape(CLOSE);
        beginShape();
        fill(0,0,0,80);
        vertex(pmino.x, pmino.y);
        vertex(pmino.x + tablero.lado_celda, pmino.y)
        vertex(pmino.x + tablero.lado_celda, pmino.y + tablero.lado_celda);
        endShape(CLOSE);
        pop();

    }
}


function crearMapeoBaseTetriminos(){
    tetriminosBase = {      // variable global
        "Z":{
            color: "red",
            mapa:[
                createVector(), //createVector es un metodo de p5.js
                createVector(-1,-1),
                createVector(0,-1),
                createVector(1,0)
            ]
        },
        "S":{
            color: "green",
            mapa:[
                createVector(), //createVector es un metodo de p5.js
                createVector(0,-1),
                createVector(1,-1),
                createVector(-1,0)
            ]
        },
        "J":{
            color: "orange",
            mapa:[
                createVector(), //createVector es un metodo de p5.js
                createVector(-1,0),
                createVector(-1,-1),
                createVector(1,0)
            ]
        },
        "L":{
            color: "dodgerblue",
            mapa:[
            createVector(), //createVector es un metodo de p5.js
                createVector(-1,0),
                createVector(1,-1),
                createVector(1,0)
            ]
        },
        "T":{
            color: "magenta",
            mapa:[
                createVector(), //createVector es un metodo de p5.js
                createVector(0,-1),
                createVector(1,0),
                createVector(-1,0)
            ]
        },
        "I":{
            color: "cyan",
            mapa:[
                createVector(), //createVector es un metodo de p5.js
                createVector(0,-1),
                createVector(0,1),
                createVector(0,2)
            ]
        },
        "O":{
            color: "yellow",
            mapa:[
            createVector(), //createVector es un metodo de p5.js
                createVector(0,-1),
                createVector(-1,0),
                createVector(-1,-1)
            ]
        }
    }
} 