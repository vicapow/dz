var shapes = module.exports = {}

// unit circle flat against the YZ plane where `n` is the "resolution"
// n = 1 -> a line
// n = 2 -. a triangle
// etc...
shapes.circle = function(n){
  var t = Math.PI * 2 // tau
  return d3.range(n + 1).map(function(i){
    return [sin(i / n * t), cos(i / n * t), 0]
  })
}

// construct a grid or matrix box of points where `n` is the "resolution", ie., 
// the number of inner points
// n = 2 -> a simple 8 point cube
shapes.box = function(n){
  if(!n) n = 2
  var s = 1 / (n - 1), t = 1 / 2
  var points = []
  for(var x = 0; x < n; x++){
    for(var y = 0; y < n; y++){
      for(var z = 0; z < n; z++){
        points.push([x * s - t, y * s - t, z * s - t])
      }
    }
  }
  return points
}