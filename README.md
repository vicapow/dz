# DZ is A simple library for making 3D fun with D3
__WARNING__: this is a _very_ new (and likely unstable) project. use as your own risk.

DZ takes data in 3 dimensions and transforms it to 2 dimensions.

DZ(3d) -> 2d

And doesn't try to do anything more than that!

checkout these demos
  + [ball cube](http://vicapow.github.io/dz/example/dot-matrix.html)
  + [simple cube](http://vicapow.github.io/dz/example/cube.html)

## Installation

just download [dz.js](https://raw.github.com/vicapow/dz/master/dz.js) and include it into your HTML

````html
  <script src="dz.js"></script>
````

or, install via npm

    npm install dz

## Example

Here's a quick sample. Checkout [example/dot-matrix.html](http://vicapow.github.io/dz/example/dot-matrix.html) for a working demo.

````js
// create a new projection
var perspective = dz.projection.perspective()
  // and configure the camera (aka, the "eyeball")
  .camera().position([0, 0, 1]).lookAt([0, 0, 0])
// create some 3d data
var data = [0, -1, 0.5] // a point at (0, -1, 0.5)

p.project(data) // -> [x, y] projection of your data point

p.x(data) // provides the x coordinate of the 3D -> 2D projection
p.y(data) // provides the y coordinate of the 3D -> 2D projection
````

No documentation yet so for now have a look at the source code