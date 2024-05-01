

/*
 * author: Nadeem Elahi
 * nadeem.elahi@gmail.com
 * nad@3deem.com
 * license: gpl v3
 */

//var mat = new Float32Array(16);

function print3x3mat ( mat ) {
	var idx , lim = 3;

	for ( idx = 0 ; idx < lim ; idx ++ ){

		console.log( mat[idx][0]
			+ " " + mat[idx][1]
			+ " " + mat[idx][2]
		);
	}
}

function make3x3array() {
	return [
		[1,0,0],
		[0,1,0],
		[0,0,1] 
	]
}

/*
 *  https://semath.info/src/cofactor-matrix.html
 */

function cofactor3x3( eh , em , cf ) {

	function calcSign ( idx , jdx ) {
		if ( (idx + jdx ) % 2 ) return -1; // odd
		else return 1; // even
	}

	var sign , signChar ;
	var idexs , jdexs , 
		idexBig , idexSm ,
		jdexBig , jdexSm ,
		cnt ;

	var idx , jdx , lim = 4 ;

	for ( idx = 1 ; idx < lim ; idx ++ ) {
		for ( jdx = 1 ; jdx < lim ; jdx ++ ) {
			
			idexs = [];
			jdexs = [];
			
			for ( cnt = 1 ; cnt < lim ; cnt ++ ){ 
				if ( cnt != idx )
					idexs.push(cnt);

				if ( cnt != jdx ) 
					jdexs.push(cnt);
			}

			//console.log("---");

			idexBig = idexs.pop(); 
			jdexBig = jdexs.pop();
			idexSm = idexs.shift(); 
			jdexSm = jdexs.shift();
			
			// since we are using indices 1,2,3
			// while our array's indices go 0,1,2

			em[idx-1][jdx-1] = 
				eh[idexSm-1][jdexSm-1]
				*eh[idexBig-1][jdexBig-1]
				- eh[idexSm-1][jdexBig-1]
				*eh[idexBig-1][jdexSm-1] ;


		}
	}

	for ( idx = 1 ; idx < lim ; idx ++ ) {
		for ( jdx = 1 ; jdx < lim ; jdx ++ ) {

			sign = calcSign ( idx , jdx ) ;
			cf[idx-1][jdx-1] = sign * em[jdx-1][idx-1]

		}
	}

	/*
	 * https://semath.info/src/determinant-three-by-three.html
	 *
	 * det = a11*m11 - a21*m21 + a31*m31
	 *
	 * offset index starting from 0 
	 * det = a00*m00 - a10*m10 + a20*m20
	 *
	 */
	return eh[0][0]*em[0][0] - eh[1][0]*em[1][0] + eh[2][0]*em[2][0];
}


// a random 3x3 matrix
var eh = [];
eh[0] = [1,2,3];
eh[1] = [4,5,6];
eh[2] = [7,8,9];
console.log("---");
print3x3mat( eh );

var em = make3x3array(); // determinants matrix
var cf = make3x3array(); // cofactor matrix

var det = cofactor3x3( eh , em , cf );

console.log("---");
print3x3mat ( em )

console.log("---");
print3x3mat ( cf )

console.log("---");
console.log("det: " + det);
