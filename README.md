# mongoose-type-relation
A field-type for Mongoose schemas that allows easy relationships between models.

[![npm version](https://badge.fury.io/js/mongoose-type-relation.svg)](http://badge.fury.io/js/mongoose-type-relation)
[![Build Status](https://travis-ci.org/konsumer/mongoose-type-relation.svg?branch=master)](https://travis-ci.org/konsumer/mongoose-type-relation)
[![Code Climate](https://codeclimate.com/github/konsumer/mongoose-type-relation/badges/gpa.svg)](https://codeclimate.com/github/konsumer/mongoose-type-relation)

This field-type will populate external model references. If you update either side of the the relationship, it will update it on both.


## installation

    npm install mongoose-type-relation


## usage

```javascript
var mongoose = require('mongoose');
var Relation = require('mongoose-type-relation');
```

The module exports it's field-type, but also adds it to `mongoose.SchemaTypes` as `mongoose.SchemaTypes.Relation`, like other fieldtypes.

### example

```javascript
var UserSchema = new mongoose.Schema({
    authored: [{type:Relation, ref:'Post', fieldref: 'author'}],
    edited: [{type:Relation, ref:'Post', fieldref:'editors'}]
});
var User = mongoose.model('User', UserSchema);

var PostSchema = new mongoose.Schema({
    author: {type:Relation, ref:'User'},
    editors: [{type:Relation, ref:'User'}]
});
var Post = mongoose.model('Post', PostSchema);
```

In this example, if you add Posts to `User.edited` or `User.authored`, they will be added to the Post's corresponding fields and vice-versa (set `Post.author` or `Post.editors`.)  You still need to save all the records involved. This field type doesn't save anythng.

You should always add relationships with the whole object:

```javascript
var author = new User();
var post = new Post();
post.author = author;
```

Have a look at the tests for more examples.

### populate

Since ths uses standard mongoose references over `ObjectId`s, you can fill record's children with [`populate()`](http://mongoosejs.com/docs/populate.html).