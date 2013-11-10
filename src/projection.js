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
    var pos = [0,0,1] // aka, `eye`
      , lookAt = [0,0,0]
      , f = 1
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