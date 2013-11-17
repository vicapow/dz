var points = module.exports = {}

// unit circle flat against the YZ plane where `n` is the "resolution"
// n = 1 -> a line
// n = 2 -. a triangle
// etc...
points.circle = function(n){
  var t = Math.PI * 2 // tau
  return d3.range(n + 1).map(function(i){
    return [sin(i / n * t), cos(i / n * t), 0]
  })
}

// construct a grid or matrix box of points where `n` is the "resolution", ie., 
// the number of inner points
// n = 2 -> a simple 8 point cube
points.grid = function(nx, ny, nz){
  // optional arguments
  if(!nx) nx = 2
  if(!ny) ny = nx
  if(!nz) nz = ny

  var points = []
    , sx, tx = 0.5
    , sy, ty = 0.5
    , sz, tz = 0.5
  
  if(nx < 2){ sx = 1; tx = 0 } else sx = 1 / (nx - 1)
  if(ny < 2){ sy = 1; ty = 0 } else sy = 1 / (ny - 1)
  if(nz < 2){ sz = 1; tz = 0 } else sz = 1 / (nz - 1)

  for(var x = 0; x < nx; x++){
    for(var y = 0; y < ny; y++){
      for(var z = 0; z < nz; z++){
        points.push([x * sx - tx, y * sy - ty, z * sz - tz])
      }
    }
  }
  return points
}

points.plane = function(n){ return points.grid(1, n, n) }