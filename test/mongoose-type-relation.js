var expect = require('chai').expect;
var mongoose = require('mongoose');
require('../');

require('mockgoose')(mongoose);


describe('mongoose-type-relation', function(){
	before(function(done){
		mongoose.connect('mongodb://localhost/test');
		mongoose.connection.on('error', function(){});
		mongoose.connection.once('open', done);
	});

	after(function(){
		mongoose.connection.close();
	});

	it('It should allow a 1-to-many relationship', function(done){
	});

	it('It should allow a many-to-many relationship', function(done){
	});

	it('It should allow a many-to-1 relationship', function(done){
	});
});