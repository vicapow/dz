var shapes = module.exports = {}

// unit circle flat against the YZ plane
// `n` is the "resolution"
// n = 1 -> a line
// n = 2 -. a triangle
// etc...
shapes.circle = function(n){
  var t = Math.PI * 2 // tau
  return d3.range(n + 1).map(function(i){
    return [sin(i / n * t), cos(i / n * t), 0]
  })
}