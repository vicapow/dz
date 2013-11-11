!function(e){"object"==typeof exports?module.exports=e():"function"==typeof define&&define.amd?define(e):"undefined"!=typeof window?window.ind33d=e():"undefined"!=typeof global?global.ind33d=e():"undefined"!=typeof self&&(self.ind33d=e())}(function(){var define,module,exports;
return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ind33d = { projection: {} }

ind33d.matrix = require('./matrix')
ind33d.vector = require('./vector')
ind33d.projection = require('./projection')

ind33d.translate = function(points, delta){
  return points.map(function(p){
    return [p[0] + delta[0], p[1] + delta[1], p[2] + delta[2]]
  })
}

ind33d.rotate = function(points, theta){
  return points.map(function(p){
    return [ 
      p[0] * Math.cos(theta) - p[2] * Math.sin(theta) 
      , p[1]
      , p[0] * Math.sin(theta) + p[2] * Math.cos(theta) 
    ]
  })
}

ind33d.scale = function(points, scale){
  return points.map(function(p){
    return [ p[0] * scale[0], p[1] * scale[1], p[2] * scale[2] ]
  })
}

module.exports = ind33d
},{"./matrix":2,"./projection":3,"./vector":4}],2:[function(require,module,exports){
var vector = require('./vector')

var matrix = module.exports = function(m){

  /** of the form:
    * [ [1, 0, 0, tx]
    * , [0, 1, 0, ty]
    * , [0, 0, 1, tz]
    * , [0, 0, 0, 1]]
    */

  var matrix = {} // the matrix object
  
  // borrowed heavily from: 
  // https://github.com/mrdoob/three.js/blob/master/src/math/Matrix4.js
  matrix.multi = function(m1){
    if(!(m1 instanceof Array)) m1 = m1.array()
    var ae = m // this array
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

    return matrix // make chain-able
  }

  // turn the matrix into a purely rotation matrix along the x axis
  // based on
  // https://github.com/mrdoob/three.js/blob/master/src/math/Matrix4.js#L730
  matrix.rotateX = function(theta){
    if(!theta) theta = 0
    var c = Math.cos(theta), s = Math.sin(theta)
    m = [
        [1, 0, 0, 0]
      , [0, c, s, 0]
      , [0, -s, c, 0]
      , [0, 0, 0, 1]
    ]
    return matrix
  }

  // turn the matrix into a purely rotation matrix along the y axis
  matrix.rotateY = function(theta){
    if(!theta) theta = 0
    var c = Math.cos(theta), s = Math.sin(theta)
    m = [
        [c, 0, -s, 0]
      , [0, 1, 0, 0]
      , [s, 0, c, 0]
      , [0, 0, 0, 1]
    ]
    return matrix
  }

  // turn the matrix into a purely rotation matrix along the z axis
  matrix.rotateZ = function(theta){
    if(!theta) theta = 0
    var c = Math.cos(theta), s = Math.sin(theta)
    m = [
        [c, s, 0, 0]
      , [-s, c, 0, 0]
      , [0, 0, 1, 0]
      , [0, 0, 0, 1]
    ]
    return matrix
  }
  
  // return the internal array
  matrix.array = function(){ return m }

  matrix.translate = function(v){
    if(!v) return [ m[0][3], m[1][3], m[2][3] ]
    if(!(v instanceof Array)) v = v.array()
    m[0][3] = v[0]
    m[1][3] = v[1]
    m[2][3] = v[2]
    return matrix // make chain-able
  }

  // unlike three.js, our `lookAt` also sets the position to be `eye`
  // creates a transform that would take a unit camera at (0,0,0) looking
  // down the -z axis and up along the y axis to the coordinates described
  // by `eye`, `target` and `up`
  matrix.lookAt = function(eye, target, up){
    var x = vector()
      , y = vector()
      , z = vector(eye).minus(target).normalize()

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

    return matrix // make chain-able
  }
  
  matrix.multiVector = function(vec){
    vec = vector(vec).array() // copy
    var x = vec[0], y = vec[1], z = vec[2] // required for temp storage
    vec[0] = m[0][0] * x + m[0][1] * y + m[0][2] * z + m[0][3]
    vec[1] = m[1][0] * x + m[1][1] * y + m[1][2] * z + m[1][3]
    vec[2] = m[2][0] * x + m[2][1] * y + m[2][2] * z + m[2][3]
    return vec.slice(0) // copy
  }
  matrix.multiScalar = function(s){
    m[0][0] *= s; m[0][1] *= s; m[0][2] *= s; m[0][3] *= s
    m[1][0] *= s; m[1][1] *= s; m[1][2] *= s; m[1][3] *= s
    m[2][0] *= s; m[2][1] *= s; m[2][2] *= s; m[2][3] *= s
    m[3][0] *= s; m[3][1] *= s; m[3][2] *= s; m[3][3] *= s
    return matrix
  }

  // make identity matrix
  matrix.identity = function(){
    m = [ 
        [1, 0, 0, 0]
      , [0, 1, 0, 0]
      , [0, 0, 1, 0]
      , [0, 0, 0, 1]
    ]
    return matrix
  }

  matrix.toString = function(){
    return m[0].toString() + '\n'
         + m[1].toString() + '\n' 
         + m[2].toString() + '\n' 
         + m[3].toString()
  }

  matrix.inverse = function(){
    // based on 
    // https://github.com/mrdoob/three.js/blob/master/src/math/Matrix4.js
    var t = m
      , n11 = t[0][0], n12 = t[0][1], n13 = t[0][2], n14 = t[0][3]
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

    if(det === 0) throw new Error('det=0 for matrix.inverse()')

    return matrix.multiScalar(1 / det) // return chain-able ref to `m`
  }
  
  if(!m) matrix.identity()
  else if(!(m instanceof Array)) m = m.array() // convert matrix to array
  m = m.slice(0) // copy

  return matrix
}
},{"./vector":4}],3:[function(require,module,exports){
var projection = module.exports = {}

var matrix = require('./matrix')
var vector = require('./vector')

projection.perspective = function(){
  // perspective generating function

  // TODO: consider using vector.scale?
  function scale3(vec, scale){
    return [vec[0] * scale, vec[1] * scale, vec[2] * scale] // copy
  }

  // eye is located at [0, 0, 0]
  // eye is pointing at [0,0,-1]

  // the perspective object
  var perspective = {}

  function project(p){
    camera.transform() // recalculate the transform
    var ip = i.multiVector(p) /*copy*/, target = [0, 0, f]
      , Az = ip[2], Bz = target[2]
    if(Az === 0) Az = 0.00001
    var ret = scale3(p, Bz / Az)
    return ret
  }

  perspective.x = function(p){ return project(p)[0] }

  perspective.y = function(p){ return project(p)[1] }

  perspective.depth = function(p){
    var ip = i.multiVector(p) /*copy*/
    return ip[2] // how far the point is from the camera
  }

  perspective.scale = function(p){
      var ip = i.multiVector(p) /*copy*/, target = [0, 0, f]
      , Az = ip[2], Bz = target[2]
      , scale
    if(Az === 0) Az = 0.00001
    scale = Bz / Az
    if(scale < 0) scale = - scale
    if(scale === Infinity || scale < 0) scale = 0
    return scale
  }

  // does the camera transform matrix need to be recomputed?
  var dirty = true
    , t = matrix()
    , i = matrix()
    , f = 1 // focal length
  var camera = (function(){
    // defaults
    var position = [0, 0, 1], lookAt = [0, 0, 0], up = [0, 1, 0]
      , camera = {}

    camera.position = function(array3){
      if(!array3) return position.slice(0) // copy
      dirty = true
      position = array3.slice(0); return camera
    }
    camera.lookAt = function(array3){
      if(!array3) return lookAt.slice(0) // copy
      dirty = true
      lookAt = vector(array3).normalize().array(); return camera
    }
    camera.up = function(array3){
      if(!array3) return up.slice(0) // copy
      dirty = true
      up = array3.slice(0); return camera
    }
    camera.focalLength = function(scalar){
      if(scalar === undefined) return f
      dirty = true
      f = scalar; return camera
    }
    // the transformation matrix that transforms the unit camera 
    // (at loc (0,0,0), looking down the -z axis) to the position of this
    // camera. the inverse of this matrix transform will take world coordinates
    // and translate them to "film" coordinates
    // TODO: do we never need to expose this externally?
    camera.transform = function(){
      // unit camera points down the -z axis and is positioned at (0,0,0)
      if(dirty) {
        t.lookAt(position, lookAt, up)
        i = matrix(t).inverse()
      }
      dirty = false
      return t
    }
    return camera
  })()

  perspective.camera = function(){
    return camera
  }

  // create a new perspective
  return perspective
}
},{"./matrix":2,"./vector":4}],4:[function(require,module,exports){

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
  v.minus = function(v){
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
    if(!arguments.length) return x;
    x = s; return this
  }
  v.y = function(s){ 
    if(!arguments.length) return y
    y = s; return this
  }
  v.z = function(s){ 
    if(!arguments.length) return z
    z =s ; return this
  }

  v.scale = function(s){
    x = x * s; y = y * s; z = z * s
    return this
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