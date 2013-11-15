var should = require('should')
var projection = require('../src/projection')
var vector = require('../src/vector')

describe('projection.perspective', function(){
  it('should be a thing', function(){
    should.exist(projection.perspective())
  })
  describe('camera', function(){
    var perspective = projection.perspective()
    var camera = perspective.camera()

    it('should be a thing', function(){
      should.exist(camera)
    })
    describe('#position', function(){
      camera.position([16, 25, 82]).should.be.equal(camera, 'should return a '
        + 'reference to the original camera object')
      camera.position().should.be.eql([16, 25, 82])
      camera.position([0, 0, 1])
      var p = [1, 0, 0], pi = perspective(p)
      ;[ pi[0], pi[1], pi[2] ].should.be.eql(p) // comma

      camera.position([1, 0, 0]) // camera looking down the x axis
      p = [1, 0, 0]; pi = perspective(p) // point on the x axis
      // should see the point in the center of the screen
      ;[ pi[0], pi[1], pi[2] ].should.be.eql([0, 0, 0])

      p = [Math.cos(Math.PI / 4), 0, Math.sin(Math.PI / 4)]
      camera.position(p)
      pi = perspective(p)
      ;[ pi[0], pi[1], pi[2] ].should.be.eql([0, 0, 0])

    })
    describe('#lookAt', function(){
      camera.lookAt([53, 91, 3]).should.be.equal(camera, 'should return a '
          + 'reference to the original camera object')
      camera.lookAt().should.be.eql(vector([53, 91, 3]).normalize().array())
    })
    describe('#transform', function(){
      // the transformation matrix that would take the unit camera
      // to the position and orientation of this camera.
      // (unit-camera => loc(0,0,0), lookat(0,0,-1), up(0, 1, 0))
      var t = camera.position([0, 0, 0]).lookAt([0, 0, -1]).transform()
      t.multiVector([0, 0, 0]).should.eql([0, 0, 0])
      t.multiVector([189, 343, 21]).should.eql([189, 343, 21])
    })
  })
})