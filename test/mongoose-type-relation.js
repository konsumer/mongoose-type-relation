var expect = require('chai').expect;
var mongoose = require('mongoose');
require('../');

require('mockgoose')(mongoose);

var UserSchema = new mongoose.Schema({
    authored: [{type:mongoose.SchemaTypes.Relation, ref:'Post', field: 'authored', fieldref:'author'}],
    edited: [{type:mongoose.SchemaTypes.Relation, ref:'Post', field: 'edited', fieldref:'editors'}]
});
var User = mongoose.model('User', UserSchema);

var PostSchema = new mongoose.Schema({
    author: {type:mongoose.SchemaTypes.Relation, ref:'User', field:'author'},
    editors: [{type:mongoose.SchemaTypes.Relation, ref:'User', field:'editors'}]
});
var Post = mongoose.model('Post', PostSchema);

describe('mongoose-type-relation', function(){
	before(function(done){
		mongoose.connect('mongodb://localhost/test');
		mongoose.connection.once('open', done);
	});

	after(function(){
		mongoose.connection.close();
	});

	it('should allow a 1-to-many relationship', function(){
		var author = new User();
		var editor1 = new User();
		var editor2 = new User();
		var editor3 = new User();
		var post = new Post();
		console.log(mongoose.SchemaTypes.Relation.relationships);
	});

	it('should allow a many-to-many relationship', function(){
	});

	it('should allow a many-to-1 relationship', function(){
	});
});