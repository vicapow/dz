# A simple library for making 3D fun with D3

__WARNING__: this is a _very_ new (and likely unstable) project. use as your own risk.

checkout [this simple demo](http://vicapow.github.io/d33d/example/example2.html)

## Installation

just download [d33d.js](https://raw.github.com/vicapow/d33d/master/d33d.js) and include it into your HTML

````html
  <script src="d33d.js"></script>
````

or, install via npm

    npm install d33d

## Example

Here's a simple example. Checkout the [example/example2.html](http://vicapow.github.io/d33d/example/example2.html) for a more complete demo

````js
// create a new projection
var p = d33d.projection.perspective()
  // and configure the camera (aka, the "eyeball")
  .camera().position([0, 0, f / 1]).lookAt([0, 0, 0]).focalLength(f)
// create some 3d data
var data = [0, -1, 0.5] // a point at (0, -1, 0.5)

p.x(data) // provides the x coordinate of the 3D -> 2D projection
p.y(data) // provides the y coordinate of the 3D -> 2D projection
````

No documentation yet so for now have a look at the code