class Point {
    constructor ( x , y , z ){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add ( p ) {
        this.x += p.x;
        this.y += p.y;
        this.z += p.z;
        
        return this;
    }

    sub ( p ) {
        this.x -= p.x;
        this.y -= p.y;
        this.z -= p.z;
        
        return this;
    }

    multiply ( p ) {
        this.x *= p.x;
        this.y *= p.y;
        this.z *= p.z;
        
        return this;
    }

    multiplyScalar ( s ) {
        this.x *= s;
        this.y *= s;
        this.z *= s;
        
        return this;
    }
    
    copy ( p ) {
        this.x = p.x;
        this.y = p.y;
        this.z = p.z;

        return this;
    }

    set ( x , y , z ) {
        this.x = x;
        this.y = y;
        this.z = z;

        return this;
    }

    equal ( p ) {
        return this.x == p.x && this.y == p.y && this.z == p.z;
    }
}

class Box {
    constructor ( min , max ){
        this.min = min;
        this.max = max;
    }

    contains ( p ) {
        let isUp   = this.min.x <= p.x && this.min.y <= p.y && this.min.z <= p.z;
        let isDown = this.max.x > p.x && this.max.y > p.y && this.max.z > p.z;
        return isUp && isDown;
    }

    intersects ( b ) {
        return ( b.max.x < this.min.x || b.min.x > this.max.x ||
                 b.max.y < this.min.y || b.min.y > this.max.y ||
                 b.max.z < this.min.z || b.min.z > this.max.z ) ? false : true;
    }
}


class Octree {
    constructor ( boundary, n ) {
        this.boundary = boundary;
        this.capacity = n;
        this.points   = [];
        this.divided  = false;
        this.subTrees = [];
        this.color    = null;
    }

    split () {
        const STs      = [];
        let temp       = new Point(0,0,0);
        const halfSize = new Point(0,0,0);
        temp.copy( this.boundary.max ).sub( this.boundary.min ).multiplyScalar( 0.5 )
        halfSize.copy( temp );
        
        for ( let x = 0; x < 2; x ++ ) {
			for ( let y = 0; y < 2; y ++ ) {
				for ( let z = 0; z < 2; z ++ ) {

					let box = new Box( new Point( 0 , 0 , 0 ) , new Point( 0 , 0 , 0 ) );
					let v   = temp.set( x, y, z );
                    
					box.min.copy( this.boundary.min ).add( v.multiply( halfSize ) );
					box.max.copy( box.min ).add( halfSize );

					this.subTrees.push( new Octree( box, this.capacity ) );
				}
			}
		}

        let point;

        while ( point = this.points.pop() ) {
            for ( let i = 0 ; i < this.subTrees.length ; i++ ) {
                if ( this.subTrees[ i ].boundary.contains( point )) {

                    this.subTrees[ i ].points.push( point );

                }
            }
        }
        this.divided = true;
    }

    insert ( p ) {
        if ( !this.boundary.contains( p ) || this.find( p ) ) {
            return;
        }

        if ( this.points.length < this.capacity && !this.divided ) {
            this.points.push( p );
        } else {
            if ( !this.divided ){
                this.split();
                console.log("Se divide");
            }

            for ( let i = 0 ; i < this.subTrees.length ; i++) {
                this.subTrees[ i ].insert( p );
            }
        }
    }

    find ( p ) {
        if ( !this.boundary.contains( p ) ) {
            return false;
        }

        for ( let i = 0 ; i < this.subTrees.length ; i++ ) {
            const subTree = this.subTrees[ i ];
            if ( !subTree.boundary.contains( p ) ) {
                continue;
            }

            if ( subTree.points.length > 0 ) {
                for ( let j = 0 ; j < subTree.points.length ; j++ ) {
                    if ( subTree.points[ j ].equal( p ) ) {
                        return true;
                    }
                }
            }
        }
    }
}


a = new Point(0,0,0);
b = new Point(10,10,10);
c = new Box(a,b);
ot = new Octree(c,3);
d = new Point(3,3,3);
e = new Point(4,4,4);
f = new Point(5,5,5);
g  = new Point(6,6,6);
ot.insert(d);
ot.insert(e);
ot.insert(f);
ot.insert(g);