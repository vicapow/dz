
var should = require('should')
  , vector = require('../src/vector')


describe('vector', function(){
  it('should be a thing', function(){
    should.exist(vector)
    vector.should.be.an.instanceof(Function)
    vector()
  })
  it('should create a [0,0,0] vector by default', function(){
    vector().array().should.eql([0, 0, 0])
  })
  it('should take an optional array to initialize the vector', function(){
    vector([1, 2, 3]).array().should.eql([1, 2, 3])
  })
  describe('#sub', function(){
    it('should subtract two vectors', function(){
      vector([199, 7, 3]).sub([199, 7, 3]).array().should.eql([0, 0, 0])
    })
  })
  describe('#length', function(){
    it('should give the length of the vector', function(){
      vector([1, 1, 1]).length().should.eql(Math.sqrt(3))
    })
  })
  describe('cross', function(){
    it('should produce the vector cross-product', function(){
      vector([1, 0, 0]).cross([0, 1, 0]).array().should.eql([0, 0, 1])
      vector([0, 1, 0]).cross([1, 0, 0]).array().should.eql([0, 0, -1])
    })
    it('should take two arguments', function(){
      vector([0, 0, 0]).cross([1, 0, 0], [0, 1, 0]).array().should.eql([0, 0, 1])
    })
  })
  describe('#normalize', function(){
    it('should normalize the array', function(){
      var l = Math.sqrt(3)
      vector([1, 1, 1]).normalize().array().should.eql([1 / l, 1 / l, 1 / l])
    })
  })
})