var projection = module.exports = {}

var matrix = require('./matrix')
var vector = require('./vector')

// perspective creator
projection.perspective = function(){

  // the perspective object
  var perspective = function(p){
    camera.transform() // recalculate the transform
    // `ip` is the vector of the poin in "camera space" aka, as if the camera
    // was at (0, 0, 0)
    var ip = i.multiVector(p) /*copy `p`*/, target = [0, 0, -f]
      , Az = ip[2], Bz = target[2], scale
    if(Az === 0) Az = 0.00001
    scale = Bz / Az
    if(scale < 0) scale = 0
    return [ip[0] * scale, ip[1] * scale, ip[2] * scale, scale]
  }

  perspective.x = function(p){ return perspective(p)[0] }
  perspective.y = function(p){ return perspective(p)[1] }
  // how far the point is from the camera
  perspective.depth = function(p){ return i.multiVector(p)[2] /*copy `p`*/ }
  perspective.scale = function(p){ return perspective(p)[3] }

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
      position = array3.slice(0) /*copy*/
      return camera
    }
    camera.lookAt = function(array3){
      if(!array3) return lookAt.slice(0) // copy
      dirty = true
      lookAt = array3
      return camera
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