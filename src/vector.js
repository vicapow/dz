
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