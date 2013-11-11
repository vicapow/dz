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