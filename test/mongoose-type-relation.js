var expect = require('chai').expect;
var mongoose = require('mongoose');
var Relation = require('../');

require('mockgoose')(mongoose);

var UserSchema = new mongoose.Schema({
    authored: [{type:Relation, ref:'Post', fieldref:'author'}],
    edited: [{type:Relation, ref:'Post', fieldref:'editors'}]
});
var User = mongoose.model('User', UserSchema);

var PostSchema = new mongoose.Schema({
    author: {type:Relation, ref:'User', fieldref:'authored'},
    editors: [{type:Relation, ref:'User', fieldref:'edited'}]
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
		var post = new Post();
		post.author = author;
		expect(author.authored).to.have.members([post._id]);
		expect(post.author).to.equal(author._id);
	});

	it('should allow a many-to-many relationship', function(){
		var editor1 = new User();
		var editor2 = new User();
		var post = new Post();
		post.editors = [editor1, editor2];
		expect(post.editors).to.have.members([editor1._id, editor2._id]);
		expect(editor1.edited).to.have.members([post._id]);
		expect(editor2.edited).to.have.members([post._id]);
	});
});