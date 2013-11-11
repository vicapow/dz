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