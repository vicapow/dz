var should = require('should')
  , matrix = require('../src/matrix')

var array4x4Identity = [
    [1, 0, 0, 0]
  , [0, 1, 0, 0]
  , [0, 0, 1, 0]
  , [0, 0, 0, 1]
]

var array4x4Random = [
    [1, 2, 3, 4]
  , [5, 6, 7, 8]
  , [9, 10, 11, 12]
  , [13, 14, 15, 16]
]

var array4x4Translate = [
    [1, 0, 0, 4]
  , [0, 1, 0, 8]
  , [0, 0, 1, 12]
  , [0, 0, 0, 1]
]

describe('matrix', function(){
  it('should be a thing', function(){
    should.exist(matrix)
  })
  it('should create a matrix', function(){
    var m = matrix()
    should.exist(m)
  })
  describe('#array', function(){
    it('should convert the matrix to an 4x4 array', function(){
      var array = matrix().array()
      should.exist(array)
      array.should.be.an.instanceof(Array)
      array.should.eql(array4x4Identity)
    })
    it('should give back the array we gave it', function(){
      matrix(array4x4Random).array().should.eql(array4x4Random)
    })
  })
  describe('#translate', function(){
    it('should update or get the translate', function(){
      var m = matrix()
      m.translate([56, 57, 58]).should
        .equal(m, 'should return a reference to the original matrix')
      m.translate().should
        .eql([56, 57, 58], 'should update the translate and return it')
    })
  })
  describe('#identity', function(){
    var m = matrix(array4x4Random)
    m.identity().array().should.eql(array4x4Identity)
  })
  describe('#multi', function(){
    it('should multiply two matrices', function(){
      var m1 = matrix().translate([4, 5, 6])
      var m2 = matrix().translate([7, 8, 9]) //
      m1.multi(m2).translate().should.eql([11, 13, 15])
    })
  })
  describe('#inverse', function(){
    var inverse = matrix().translate([4, 5, 6]).inverse()
    inverse.translate().should.eql([-4, -5, -6])
    inverse.inverse().translate().should.eql([4, 5, 6])

    ;(function(){
      matrix(array4x4Random).inverse().inverse().array()
        .should.eql(array4x4Random)
    }).should.throw() // because of det=0

  })
  describe('#multiVector', function(){
    it('should produce the product of multiplying the matrix with a vector'
    , function(){
      var m = matrix() // identity by default
      m.multiVector([0, 0, 0]).should.eql([0, 0, 0])
      m.multiVector([4, 5, 60]).should.eql([4, 5, 60])
      matrix().translate([1, 2, 3]).multiVector([0, 0, 0]).should.eql([1, 2, 3])
      matrix().translate([4, 5, 60]).multiVector([0, 0, 0]).should.eql([4, 5, 60])
      m.translate([1,2,3]).multiVector([0, 0, 0]).should.eql([1, 2, 3])
    })
  })
  describe('#lookAt', function(){
    it('should create a matrix transform specified by `eye`, `target` and `up`'
      + ' that would transform the unit camera at (0,0,0) looking down the -z '
      + ' axis to the desired coordinates'
    , function(){
      var eye = [0, 0, 0], target = [0, 0, -1], up = [0, 1, 0]
      var m = matrix().lookAt(eye, target, up)
      m.translate().should.eql(eye)
      m.multiVector([0, 0, 0]).should.eql([0, 0, 0])
      m.multiVector([8, 5, 9]).should.eql([8, 5, 9])

      // unit camera at (0,0,0) looking down -z should be transformed
      // to (0,0,0) looking down x-axis
      eye = [0, 0, 0], target = [1, 0, 0]
      m = matrix().lookAt(eye, target, up)
      m.translate().should.eql(eye)
      m.multiVector([0, 0, -1]).should.eql([1, 0, 0])

      eye = [45, 69, 42], target = [0, 0, 0]
      m = matrix().lookAt(eye, target, up)
      m.translate().should.eql(eye)
      m.multiVector([0, 0, 0]).should.eql(eye)

      eye = m.inverse().multiVector(eye)
      eye[0].should.be.approximately(0, 2e-10)
      eye[1].should.be.approximately(0, 2e-10)
      eye[2].should.be.approximately(0, 2e-10)

      eye = [0, 0, 0.5]; target = [0, 0, -1]
      m.lookAt(eye, target, up)
      m.array()[0][0].should.not.be.NaN
      m.inverse().array()[0][0].should.not.be.NaN
      m.multiVector(eye).should.eql([0, 0, 0])

      eye = [1, 0, 0]; target = [0, 0, 0]
      m.lookAt(eye, target, up)
      m.array()[0][0].should.not.be.NaN
      m.multiVector([0, 0, 0]).should.eql([1, 0, 0])
      m.inverse().array()[0][0].should.not.be.NaN
      m.multiVector([0, 0, 0]).should.eql([0, 0, -1])

      // m.multiVector([1, 0, 0]).should.eql([0, 0, 0])
      // m.multiVector([0, 1, 0]).should.eql([-1, 1, 0])
      // eye = [1, 0, 0]
      // matrix().lookAt(eye, target, up).translate().should.eql(eye)
    })
  })
})