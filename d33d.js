!function(e){"object"==typeof exports?module.exports=e():"function"==typeof define&&define.amd?define(e):"undefined"!=typeof window?window.d33d=e():"undefined"!=typeof global?global.d33d=e():"undefined"!=typeof self&&(self.d33d=e())}(function(){var define,module,exports;
return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
d33d = { projection: {} }

d33d.matrix = require('./matrix')
d33d.vector = require('./vector')
d33d.projection = require('./projection')

d33d.translate = function(points, delta){
  return points.slice(0).map(function(p){
    return [p[0] + delta[0], p[1] + delta[1], p[2] + delta[2]]
  })
}

d33d.rotate = function(points, theta){
  return points.slice(0).map(function(p){
    return [ 
      p[0] * Math.cos(theta) - p[2] * Math.sin(theta) 
      , p[1]
      , p[0] * Math.sin(theta) + p[2] * Math.cos(theta) 
    ]
  })
}

module.exports = d33d
},{"./matrix":2,"./projection":3,"./vector":4}],2:[function(require,module,exports){
var vector = require('./vector')
var matrix = module.exports = function(array4x4){

  /** of the form:
    * [ [1, 0, 0, tx]
    * , [0, 1, 0, ty]
    * , [0, 0, 1, tz]
    * , [0, 0, 0, 1]]
    */

  var m = {} // the matrix object
  
  // borrowed heavily from: 
  // https://github.com/mrdoob/three.js/blob/master/src/math/Matrix4.js
  m.multi = function(m1){
    if(!(m1 instanceof Array)) m1 = m1.array()
    var ae = array4x4 // this array
    var be = m1 // the other array

    var a11 = ae[0][0], a12 = ae[0][1], a13 = ae[0][2],  a14 = ae[0][3]
    var a21 = ae[1][0], a22 = ae[1][1], a23 = ae[1][2],  a24 = ae[1][3]
    var a31 = ae[2][0], a32 = ae[2][1], a33 = ae[2][2],  a34 = ae[2][3]
    var a41 = ae[3][0], a42 = ae[3][1], a43 = ae[3][2],  a44 = ae[3][3]

    var b11 = be[0][0], b12 = be[0][1], b13 = be[0][2],  b14 = be[0][3]
    var b21 = be[1][0], b22 = be[1][1], b23 = be[1][2],  b24 = be[1][3]
    var b31 = be[2][0], b32 = be[2][1], b33 = be[2][2],  b34 = be[2][3]
    var b41 = be[3][0], b42 = be[3][1], b43 = be[3][2],  b44 = be[3][3]

    ae[0][0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41
    ae[0][1] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42
    ae[0][2] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43
    ae[0][3] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44

    ae[1][0] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41
    ae[1][1] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42
    ae[1][2] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43
    ae[1][3] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44

    ae[2][0] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41
    ae[2][1] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42
    ae[2][2] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43
    ae[2][3] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44

    ae[3][0] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41
    ae[3][1] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42
    ae[3][2] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43
    ae[3][3] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44

    return this // make chain-able
  }
  
  // return the internal array
  m.array = function(){ return array4x4 }

  m.position = function(v){
    var m = array4x4
    if(!v) return [ m[0][3], m[1][3], m[2][3] ]
    if(!(v instanceof Array)) v = v.array()
    m[0][3] = v[0]
    m[1][3] = v[1]
    m[2][3] = v[2]
    return this // make chain-able
  }

  // unlike three.js, lookAt also sets the position to be `eye`
  // useful for translating points to camera coordinates
  // m = lookAt(...).inverse()
  // m.multiVec(points)
  m.lookAt = function(eye, target, up){
    var x = vector()
      , y = vector()
      , z = vector(eye).sub(target).normalize()
      , m = array4x4

    if(z.length() === 0) z.z(1)

    x.cross(up, z).normalize()

    if(x.length() === 0){
      z.x(z.x() + 0.0001)
      x.cross(up, z).normalize()
    }

    y.cross(z, x)

    x = x.array(), y = y.array(), z = z.array()
    m[0][0] = x[0];   m[1][0] =   x[1]; m[2][0] =   x[2]
    m[0][1] = y[0];   m[1][1] =   y[1]; m[2][1] =   y[2]
    m[0][2] = z[0];   m[1][2] =   z[1]; m[2][2] =   z[2]
    m[0][3] = eye[0]; m[1][3] = eye[1]; m[2][3] = eye[2]

    return this // make chain-able
  }

  
  m.multiVector = function(vec){
    if(!(vec instanceof Array)) vec = vec.array()
    var e = array4x4, x = vec[0], y = vec[1], z = vec[2]
    vec[0] = e[0][0] * x + e[0][1] * y + e[0][2] * z + e[0][3]
    vec[1] = e[1][0] * x + e[1][1] * y + e[1][2] * z + e[1][3]
    vec[2] = e[2][0] * x + e[2][1] * y + e[2][2] * z + e[2][3]
    return vector(vec) // returns a vector object
  }
  m.multiScalar = function(s){
    var m = array4x4
    m[0][0] *= s; m[0][1] *= s; m[0][2] *= s; m[0][3] *= s
    m[1][0] *= s; m[1][1] *= s; m[1][2] *= s; m[1][3] *= s
    m[2][0] *= s; m[2][1] *= s; m[2][2] *= s; m[2][3] *= s
    m[3][0] *= s; m[3][1] *= s; m[3][2] *= s; m[3][3] *= s
    return this
  }

  // se the matrix to be the identity
  m.identity = function(){
    array4x4 = [
      [1, 0, 0, 0]
      , [0, 1, 0, 0]
      , [0, 0, 1, 0]
      , [0, 0, 0, 1]
    ]
    return this // make chain-able
  }

  m.toString = function(){
    return array4x4[0].toString()
      + '\n' + array4x4[1].toString()
      + '\n' + array4x4[2].toString()
      + '\n' + array4x4[3].toString()
  }

  m.inverse = function(){
    // based on https://github.com/mrdoob/three.js/blob/master/src/math/Matrix4.js
    var t = array4x4

    var n11 = t[0][0], n12 = t[0][1], n13 = t[0][2], n14 = t[0][3]
      , n21 = t[1][0], n22 = t[1][1], n23 = t[1][2], n24 = t[1][3]
      , n31 = t[2][0], n32 = t[2][1], n33 = t[2][2], n34 = t[2][3]
      , n41 = t[3][0], n42 = t[3][1], n43 = t[3][2], n44 = t[3][3]

    t[0][0] = n23*n34*n42 - n24*n33*n42 + n24*n32*n43 - n22*n34*n43 - n23*n32*n44 + n22*n33*n44
    t[0][1] = n14*n33*n42 - n13*n34*n42 - n14*n32*n43 + n12*n34*n43 + n13*n32*n44 - n12*n33*n44
    t[0][2] = n13*n24*n42 - n14*n23*n42 + n14*n22*n43 - n12*n24*n43 - n13*n22*n44 + n12*n23*n44
    t[0][3] = n14*n23*n32 - n13*n24*n32 - n14*n22*n33 + n12*n24*n33 + n13*n22*n34 - n12*n23*n34
    t[1][0] = n24*n33*n41 - n23*n34*n41 - n24*n31*n43 + n21*n34*n43 + n23*n31*n44 - n21*n33*n44
    t[1][1] = n13*n34*n41 - n14*n33*n41 + n14*n31*n43 - n11*n34*n43 - n13*n31*n44 + n11*n33*n44
    t[1][2] = n14*n23*n41 - n13*n24*n41 - n14*n21*n43 + n11*n24*n43 + n13*n21*n44 - n11*n23*n44
    t[1][3] = n13*n24*n31 - n14*n23*n31 + n14*n21*n33 - n11*n24*n33 - n13*n21*n34 + n11*n23*n34
    t[2][0] = n22*n34*n41 - n24*n32*n41 + n24*n31*n42 - n21*n34*n42 - n22*n31*n44 + n21*n32*n44
    t[2][1] = n14*n32*n41 - n12*n34*n41 - n14*n31*n42 + n11*n34*n42 + n12*n31*n44 - n11*n32*n44
    t[2][2] = n12*n24*n41 - n14*n22*n41 + n14*n21*n42 - n11*n24*n42 - n12*n21*n44 + n11*n22*n44
    t[2][3] = n14*n22*n31 - n12*n24*n31 - n14*n21*n32 + n11*n24*n32 + n12*n21*n34 - n11*n22*n34
    t[3][0] = n23*n32*n41 - n22*n33*n41 - n23*n31*n42 + n21*n33*n42 + n22*n31*n43 - n21*n32*n43
    t[3][1] = n12*n33*n41 - n13*n32*n41 + n13*n31*n42 - n11*n33*n42 - n12*n31*n43 + n11*n32*n43
    t[3][2] = n13*n22*n41 - n12*n23*n41 - n13*n21*n42 + n11*n23*n42 + n12*n21*n43 - n11*n22*n43
    t[3][3] = n12*n23*n31 - n13*n22*n31 + n13*n21*n32 - n11*n23*n32 - n12*n21*n33 + n11*n22*n33

    var det = n11 * t[0][0] + n21 * t[0][1] + n31 * t[0][2] + n41 * t[0][3]

    if(det === 0) throw new Error('det=0 for matrix')

    return m.multiScalar(1 / det) // return chain-able ref to `m`
  }
  
  // TODO: this should be at the top of the generator
  if(!array4x4) m.identity() // called without arguments
  // convert to array if matrix
  else if(!(array4x4 instanceof Array)) array4x4 = array4x4.array()
  array4x4 = array4x4.slice(0)

  return m
}
},{"./vector":4}],3:[function(require,module,exports){
var projection = module.exports = {}

projection.perspective = function(){
  // perspective generating function

  function scale3(vec, scale){
    return [vec[0] * scale, vec[1] * scale, vec[2] * scale]
  }

  var imagePlane = [0, 0, -1]

  // the perspective object
  var perspective = {}

  function project(p){
    var Ax = p[0], Ay = p[1], Az = p[2]
    var Bz = imagePlane[2]
    return scale3(p, Bz / Az)
  }

  perspective.x = function(p){
    // TODO: produce the x projected value of a 3d point
    return project(p)[0]
  }

  perspective.y = function(p){
    // TODO: produce the y projected value of 3d point
    return project(p)[1]
  }

  perspective.scale = function(scalar){
    // TODO: implement scaling
    return scalar
  }


  var camera = (function(){
    // defaults
    var pos = [0,0,1]
      , lookAt = [0,0,0]
      , f = 25
      , camera = {}

    camera.pos = function(array3){
      pos = array3
      return camera
    }
    camera.lookAt = function(array3){
      lookAt = array3
      return camera
    }
    camera.focal = function(scalar){
      // TODO
      f = scalar
      return camera
    }
    return camera
  })()

  perspective.camera = function(){
    return camera
  }

  // create a new perspective
  return perspective
}
},{}],4:[function(require,module,exports){

var vector = module.exports = function(array3){
  // vector argument
  if(!array3) array3 = [0, 0, 0]
  array3 = array(array3).slice(0) // copy

  var x = array3[0], y = array3[1], z = array3[2]
    , v = {}

  // ensure array
  function array(v){
    if(v instanceof Array) return v
    else return v.array()
  }

  // subtract vectors
  v.sub = function(v){
    v = array(v)
    x -= v[0]
    y -= v[1]
    z -= v[2]
    return this
  }

  v.cross = function(v1, v2){
    // allow single argument form
    if(arguments.length === 1){ v2 = v1; v1 = v }
    v1 = array(v1); v2 = array(v2)
    var tx, ty, tz
    tx = v1[1] * v2[2] - v1[2] * v2[1]
    ty = v1[2] * v2[0] - v1[0] * v2[2]
    tz = v1[0] * v2[1] - v1[1] * v2[0]
    x = tx, y = ty, z = tz
    return this
  }

  v.normalize = function(){
    var l = v.length()
    if(l){
      x = x / l
      y = y / l
      z = z / l
    }
    return this
  }

  v.x = function(s){ 
    if(arguments.length) return x = s
    else return this
  }
  v.y = function(s){ 
    if(arguments.length) return y = s
    else return this
  }
  v.z = function(s){ 
    if(arguments.length) return z = s
    else return this
  }

  v.length = function(){ return Math.sqrt( x * x + y * y + z * z) }

  v.array = function(vec){
    if(!arguments.length) return [x, y, z] 
    x = vec[0]; y = vec[1]; z = vec[2]
    return this
  }

  return v
}
},{}]},{},[1])
(1)
});
;