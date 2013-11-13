var dz = { projection: {} }

dz.matrix = require('./matrix')
dz.vector = require('./vector')
dz.projection = require('./projection')

dz.translate = function(points, delta){
  return points.map(function(p){
    return [p[0] + delta[0], p[1] + delta[1], p[2] + delta[2]]
  })
}

dz.rotate = function(points, theta){
  return points.map(function(p){
    return [ 
      p[0] * Math.cos(theta) - p[2] * Math.sin(theta) 
      , p[1]
      , p[0] * Math.sin(theta) + p[2] * Math.cos(theta) 
    ]
  })
}

dz.scale = function(points, scale){
  return points.map(function(p){
    return [ p[0] * scale[0], p[1] * scale[1], p[2] * scale[2] ]
  })
}

module.exports = dz