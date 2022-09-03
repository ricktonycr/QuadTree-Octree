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
    containsRectagle(){



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
        let parent_x = this.boundary.x;
        let parent_y = this.boundary.y;
        let parent_w = this.boundary.w;
        let parent_h = this.boundary.h;

        let half_width = parent_w/2;
        let half_height = parent_h/2;

        let center_northeast = {x:parent_x-half_width,y:parent_y+half_height};
        let center_northwest = {x:parent_x+half_width,y:parent_y+half_height};
        let center_southeast = {x:parent_x-half_width,y:parent_y-half_height};
        let center_southwest = {x:parent_x+half_width,y:parent_y-half_height};

        let rect_northeast = new Rectangle(center_northeast.x,center_northeast.y,half_width,half_height);
        let rect_northwest = new Rectangle(center_northwest.x,center_northwest.y,half_width,half_height);
        let rect_southeast = new Rectangle(center_southeast.x,center_southeast.y,half_width,half_height);
        let rect_southwest = new Rectangle(center_southwest.x,center_southwest.y,half_width,half_height);
        // 2: Asignar los QuadTree creados a cada hijo
        this.northeast = new QuadTree(rect_northeast,this.capacity);
        this.northwest = new QuadTree(rect_northwest,this.capacity);
        this.southeast = new QuadTree(rect_southeast,this.capacity);
        this.southwest = new QuadTree(rect_southwest,this.capacity);
        // 3.- Hacer: this.divided <- true
        this.divided = true;
    }


    insert ( point ){
        // Algoritmo
        // 1: Si el punto no esta en los limites ( boundary ) del quadtree Return
        if(!this.boundary.contains(point)){
            return;
        }
        // 2: Si ( this.points.length ) < ( this.capacity ),
        if(this.points.length < this.capacity){
        // 2.Insertamos en el vector this.points
            this.points.push(point);    
        }else{
        // 2.Dividimos si aun no ha sido dividido
            if(!this.divided)
                this.subdivide();
        // 2.Insertamos recursivamente en los hijos.
            this.northeast.insert ( point );
            this.northwest.insert ( point );
            this.southeast.insert ( point );
            this.southwest.insert ( point );
        }
        
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
        stroke(255);
        for (let p of this.points ){
            strokeWeight(4);
            point(p.x,p.y);
        }
    }

    query(range,found){
        if(!found){
            found = [];
        }
        if (!this.boundary.intersects(range)){
            return found;
        }else{
            for( let p of this.points){
                if(range.contains(p)){
                    found.push(p);
                }
            }
            if(this.divided){
                
                this.northeast.query(range,found);
                this.northwest.query(range,found);
                this.southeast.query(range,found);
                this.southwest.query(range,found);
            }

        }
        return found;   

    }
}
    
    