/* 
let qt;
let count = 0;
function setup() {
    createCanvas(400, 400);

    // centre point and half of width and height
    let boundary = new Rectangle(200, 200, 200, 200);

    // each leave just could have 4 elements
    qt = new QuadTree(boundary, 4);

    console.log(qt);
    for (let i = 0; i < 200; i++) {
        let p = new Point(Math.random() * 400, Math.random() * 400);
        qt.insert(p);
    }

    background(0);
    qt.show();
}
 */

let qt;
let count = 0;
let size = 700;
let range = new Rectangle(0,0,30,30);
function setup() {
    let miCanvas = createCanvas(size, size);
    miCanvas.parent("division");
    let boundary = new Rectangle(size/2, size/2, size/2, size/2);
    qt = new QuadTree(boundary, 4);
}

function draw() {
    background(0);
    if (mouseIsPressed) {
        for (let i = 0; i < 1; i++) {
            let m = new Point(mouseX + random(-5, 5), mouseY + random(-5, 5));
            qt.insert(m)
        }
    }
    background(0);
    qt.show();
    if (typeof range == undefined ){
        range = new Rectangle(random(-size/2,size/2),random(-size/2,size/2),30,30);
    }
    stroke(0,0,255);

    rect(range.x,range.y,range.w *2 , range.h *2);
    let points = [];
    qt.query(range,points);
    for (let p of points ){
        strokeWeight(4);
        point(p.x,p.y);
    }

}

function cuadrado(){
    range = new Rectangle(random(size),random(size),30,30);
    stroke(0,0,255);

    rect(range.x,range.y,range.w *2 , range.h *2);
    console.log("entra")
}


