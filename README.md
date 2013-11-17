# DZ is A small library for making 3D fun with D3

__WARNING__: this is a _very_ new (and likely unstable) project. use as your own risk.

DZ takes data in 3 dimensions and transforms it to 2 dimensions.

    DZ(3d) -> 2d

## Demos
  + [function plotting with lines](http://vicapow.github.io/dz/example/line-plot.html)
  + [dna double helix](http://vicapow.github.io/dz/example/dna.html)
  + [simple cube](http://vicapow.github.io/dz/example/cube.html)
  + [plane](http://vicapow.github.io/dz/example/plane.html)
  + [function plotting with points](http://vicapow.github.io/dz/example/plot.html)
  + [point cube](http://vicapow.github.io/dz/example/dot-matrix.html)
  + [euler formula](http://vicapow.github.io/dz/example/euler.html)
  + [orbiting ball](http://vicapow.github.io/dz/example/orbit.html)

## Installation

just download [dz.js](https://raw.github.com/vicapow/dz/master/dz.js) and include it into your HTML

````html
  <script src="dz.js"></script>
````

or, install via npm

    npm install dz

## Example

Here's a quick sample. Checkout [example/orbit.html](http://vicapow.github.io/dz/example/orbit.html) for a simple fully working demo.

````js
// create a new projection
var perspective = dz.projection.perspective()

// and configure the camera (aka, the "eyeball")
perspective.camera().position([0, 0, 1]).lookAt([0, 0, 0])

// create some 3d data
var data = [0, -1, -0.5] // a point at (0, -1, -0.5)

// projection of your data point onto the camera "film"
perspective(data) // -> [x, y]

// or also

perspective.x(data) // x coordinate of the 3D -> 2D projection
perspective.y(data) // y coordinate of the 3D -> 2D projection

````

No documentation yet so for now have a look at the source code