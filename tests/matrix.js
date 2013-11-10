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
  describe('#position', function(){
    it('should update or get the position', function(){
      var m = matrix()
      m.position([56, 57, 58]).should
        .equal(m, 'should return a reference to the original matrix')
      m.position().should
        .eql([56, 57, 58], 'should update the position and return it')
    })
  })
  describe('#identity', function(){
    var m = matrix(array4x4Random)
    m.identity().array().should.eql(array4x4Identity)
  })
  describe('#multi', function(){
    it('should multiply two matrices', function(){
      var m1 = matrix().position([4, 5, 6])
      var m2 = matrix().position([7, 8, 9]) //
      m1.multi(m2).position().should.eql([11, 13, 15])
    })
  })
  describe('#inverse', function(){
    var inverse = matrix().position([4, 5, 6]).inverse()
    inverse.position().should.eql([-4, -5, -6])
    inverse.inverse().position().should.eql([4, 5, 6])

    ;(function(){
      matrix(array4x4Random).inverse().inverse().array()
        .should.eql(array4x4Random)
    }).should.throw() // because of det=0

  })
  describe('#multiVector', function(){
    it('should produce the product of multiplying the matrix with a vector'
    , function(){
      var m = matrix() // identity by default
      m.multiVector([0, 0, 0]).array().should.eql([0, 0, 0])
      m.multiVector([4, 5, 60]).array().should.eql([4, 5, 60])
      matrix().position([1, 2, 3]).multiVector([0, 0, 0]).array()
        .should.eql([1, 2, 3])
      matrix().position([4, 5, 60]).multiVector([0, 0, 0]).array()
        .should.eql([4, 5, 60])
      m.position([1,2,3]).multiVector([0, 0, 0]).array().should.eql([1, 2, 3])
    })
  })
  describe('#lookAt', function(){
    it('should create a matrix transform specified by `eye`, `target` and `up`'
    , function(){
      var eye = [0, 1, 0], target = [1, 1, 0], up = [0, 1, 0]
      matrix().lookAt(eye, target, up).position().should.eql(eye)
      eye = [1, 0, 0]
      matrix().lookAt(eye, target, up).position().should.eql(eye)
    })
  })
})