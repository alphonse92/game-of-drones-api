var superagent = require('superagent');
var expect = require('expect.js');

describe('server', function(){

  describe('homepage', function(){

    it('should respond to GET', function(done){
      superagent
        .get('http://localhost:' + app.port)
        .end(function(err, res){
	        expect(res.status).to.equal(200);
	        done();
	    });
    });
  });
});