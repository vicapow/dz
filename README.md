# DZ is A small library to help manipulate and project 3D data

<div style="float: right;">
  <img src="logo.png">
  <br>
  <span>logo by aneesh (https://github.com/abhoopathy)</span>
</div>

DZ takes data in 3 dimensions and transforms it to 2 dimensions.

    DZ(3d) -> 2d

DZ works well with D3

## Demos

  + [plotting equations with dots](http://vicapow.github.io/dz/example/equation-plot.html)
  + [or with lines](http://vicapow.github.io/dz/example/line-plot.html)
  + [a teapot](http://vicapow.github.io/dz/example/teapot.html)
  + [dna double helix](http://vicapow.github.io/dz/example/dna.html)
  + [DOF with SVG blur](http://vicapow.github.io/dz/example/plane-blur.html)
  + [simple cube](http://vicapow.github.io/dz/example/cube.html)
  + [plane](http://vicapow.github.io/dz/example/plane.html)
  + [function plotting with points](http://vicapow.github.io/dz/example/dot-plot.html)
  + [point cube](http://vicapow.github.io/dz/example/dot-matrix.html)
  + [euler formula](http://vicapow.github.io/dz/example/euler.html)
  + [orbiting ball](http://vicapow.github.io/dz/example/orbit.html)

## Installation

download [dz.js](https://raw.github.com/vicapow/dz/master/dz.js) and include it into your HTML

````html
  <script src="dz.js"></script>
````

or, install via npm

    npm install dz

## Caution

DZ in combination with D3 isn't suited for plotting all times of 3 dimensional geometric shapes. For example, it wont know how to deal with surface intersections. In most 3D graphics environments, depth is computed per pixel but with DZ and D3, all our geometry is still SVG which is either entirely above or entirely bellow other SVG elements (ever both above and bellow as would be the case when projecting two intersecting planes.)

## Example

Here's a small example. Checkout [example/orbit.html](http://vicapow.github.io/dz/example/orbit.html) for a fully working demo.

````js
// create a new perspective projection
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
