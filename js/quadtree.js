class Point {
    constructor (x, y, userData ){
    this.x = x;
    this.y = y;
    this.userData = userData;
    }
}

class Rectangle {
    constructor (x, y, w, h) {
        this.x = x; // center
        this.y = y;
        this.w = w; // half width
        this.h = h; // half height
    }

    // verifica si este objeto contiene un objeto Punto
    contains(point){
        let minX = this.x - this.w;
        let minY = this.y - this.h;
        let maxX = this.x + this.w;
        let maxY = this.y + this.h;

        return ( point.x > minX && point.x <= maxX && point.y > minY && point.y <= maxY ) ? true : false;
    }

    // verifica si este objeto se intersecta con otro objeto Rectangle
    intersects(range){
        let difX = Math.abs(this.x - range.x);
        let difY = Math.abs(this.y - range.y);
        let sumX = this.w + range.w;
        let sumY = this.h + range.h;

        return (difX < sumX && difY < sumY) ? true : false;
    }
}

class QuadTree {
    constructor ( boundary , n){
        this.boundary = boundary; // Rectangle
        this.capacity = n; // capacidad maxima de cada cuadrante
        this.points = []; // vector , almacena los puntos a almacenar
        this.divided = false;
    }
    
    // divide el quadtree en quadtrees
    subdivide () {
        // Algoritmo
        // 1: Crear hijos: qt_northeast , qt_northwest , qt_southeast ,qt_southwest
        // 2: Asignar los QuadTree creados a cada hijo
        // this.northeast = qt_northeast;
        // this.northwest = qt_northwest;
        // this.southeast = qt_southeast;
        // this.southwest = qt_southwest;
        // 3.- Hacer: this.divided <- true
    }


    insert ( point ){
        // Algoritmo
        // 1: Si el punto no esta en los limites ( boundary ) del quadtree Return
        // 2: Si ( this.points.length ) < ( this.capacity ),
        // 2.Insertamos en el vector this.points
        // Sino
        // 2.Dividimos si aun no ha sido dividido
        // 2.Insertamos recursivamente en los hijos.
        // this.northeast.insert ( point );
        // this.northwest.insert ( point );
        // this.southeast.insert ( point );
        // this.southwest.insert ( point );
    }

    show () {
        stroke(255);
        strokeWeight(1);
        noFill();
        rectMode(CENTER);
        rect(this.boundary.x,this.boundary.y,this.boundary.w*2,this.boundary.h*2);
        if( this.divided ) {
            this.northeast.show();
            this.northwest.show();
            this.southeast.show();
            this.southwest.show();
        }

        for (let p of this.points ){
            strokeWeight(4);
            point(p.x,p.y);
        }
    }
}
    
    