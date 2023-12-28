class Tablero {
    constructor(){
        this.filas = 20;
        this.columnas=10;
        this.lado_celda = 25;
        this.ancho = this.columnas*this.lado_celda;
        this.alto = this.filas*this.lado_celda;
        this.posicion = createVector(margenTablero/2, margenTablero/2 + this.lado_celda);
        this.minosAlmacenados = [] //Representa los minos almacenados en el tablero
        this.filaLlena = []
        for (let fila = 0; fila < this.filas; fila++) {
            this.minosAlmacenados[fila] = []
            for (let columna = 0; columna < this.columnas; columna++) {
                this.minosAlmacenados[fila].push("");
            }
        }
    }

    set almacenarMinos(tetrimino){
        for (const pmino of tetrimino.mapaTablero) {
            if (pmino.y < 0) { //juego terminado
                tablero = new Tablero();
                tetrimino = new Tetrimino();
                velocidad = 400;
            }
            this.minosAlmacenados[pmino.x][pmino.y] = tetrimino.nombre
        }
        this.buscarLineasHorizontalesBorrar()
    }

    // buscarLineasHorizontalesBorrar(){
    //     let lineas = [];
    //     for (let fila = this.filas -1; fila >= 0; fila--){
    //         let agregar = true;
    //         for (let columna = 0; columna < this.columnas; columna++){
    //             if (!this.minosAlmacenados[columna][fila]) {
    //                 agregar = false
    //                 break
    //             }
    //         }
    //         if(agregar){
    //             lineas.push(fila)
    //         }
    //     }
    //     this.borrarLineasHorizontales(lineas)
    // }

    buscarLineasHorizontalesBorrar(){
        let lineas = [];
    
        // verificar cada fila del tablero
        for (let fila = 0; fila < this.filas; fila++) {
            let filaCompleta = true;
    
            // verificar cada columna de la fila
            for (let columna = 0; columna < this.columnas; columna++) {
                if (this.minosAlmacenados[fila][columna] === "") {
                    filaCompleta = false;
                    break;
                }
            }
    
            // si la fila está completa, agregarla al array de lineas
            if (filaCompleta) {
                lineas.push(fila);
            }
        }
    
        // borrar las lineas completas y agregar un delay
        if (lineas.length > 0) {
            for (const linea of lineas) {
                this.minosAlmacenados.splice(linea, 1);
                this.minosAlmacenados.unshift(new Array(this.columnas).fill(""));
            }
            delay(1000); // ajustar este valor según el tiempo que deseas agregar después de borrar una línea
        }
    }

    borrarLineasHorizontales(lineas){
        for (const linea of lineas) {
            for (let fila = linea; fila >=0; fila++) {
                for (let columna = 0; columna < this.columnas; columna++) {
                    if (fila == 0) {
                        this.minosAlmacenados[columna][fila] = ""
                        continue;                        
                    }
                    this.minosAlmacenados[columna][fila]=this.minosAlmacenados[columna][fila - 1]
                }
            }
        }
    }

    coordenada(x,y){ //createVector es un metodo de p5.js
        return createVector(x,y).mult(this.lado_celda).add(this.posicion); 
    }


    //Se encarga del procesamiento logico para dibujar del tablero
    dibujar(){
        push(); //metodo de p5.js
        noStroke(); //metodo de p5.js
        for (let columna = 0; columna < this.columnas; columna++) {
            for (let fila = 0; fila < this.filas; fila++) {
                if((columna+fila)%2==0){
                    fill("black")
                }else{
                    fill("#003");
                }
                let c = this.coordenada(columna, fila);
                rect(c.x, c.y, this.lado_celda);
            }
        }
        pop(); //metodo de p5.js
        this.dibujarMinosAlmacenados();
    }

    dibujarMinosAlmacenados(){
        push()
        for (let columna = 0; columna < this.columnas; columna++) {
            for (let fila = 0; fila < this.filas; fila++) {
                let nombreMino = this.minosAlmacenados[columna][fila]
                if(nombreMino){
                    fill(tetriminosBase[nombreMino].color);
                    Tetrimino.dibujarMino(this.coordenada(columna, fila));
                }
            }
        }
        pop()
    }
}