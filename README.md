# INCOMPLETE: still working out ideas

# mongoose-type-relation
A field-type for Mongoose schemas that allows easy relationships between models.

[![npm version](https://badge.fury.io/js/mongoose-type-relation.svg)](http://badge.fury.io/js/mongoose-type-relation)
[![Build Status](https://travis-ci.org/konsumer/mongoose-type-relation.svg?branch=master)](https://travis-ci.org/konsumer/mongoose-type-relation)
[![Code Climate](https://codeclimate.com/github/konsumer/mongoose-type-relation/badges/gpa.svg)](https://codeclimate.com/github/konsumer/mongoose-type-relation)

## installation

    npm install mongoose-type-relation


## usage

var mongoose = require('mongoose');
require('mongoose-type-relation');

### 1-to-many

```javascript
var UserSchema = new mongoose.Schema({
    authored: [{type:mongoose.SchemaTypes.Relation, ref:'Post', fieldref: 'author'}]
});
```

### many-to-1

```javascript
var PostSchema = new mongoose.Schema({
    author: {type:mongoose.SchemaTypes.Relation, ref:'User'}
});
```

### many-to-many

```javascript
var PostSchema = new mongoose.Schema({
    author: {type:mongoose.SchemaTypes.Relation, ref:'User'},
    editors: [{type:mongoose.SchemaTypes.Relation, ref:'User'}]
});
```

### populate

You can get records for all the first-level children with [`populate()`](http://mongoosejs.com/docs/populate.html)

```javascript
var UserSchema = new mongoose.Schema({
    authored: [{type:mongoose.SchemaTypes.Relation, ref:'Post', fieldref: 'author'}],
    edited: [{type:mongoose.SchemaTypes.Relation, ref:'Post', fieldref: 'editors'}]
});
var User = mongoose.model('User', UserSchema);

var PostSchema = new mongoose.Schema({
    author: {type:mongoose.SchemaTypes.Relation, ref:'User'},
    editors: [{type:mongoose.SchemaTypes.Relation, ref:'User'}]
});
var Post = mongoose.model('Post', PostSchema);

var author = new User();
var editor1 = new User();
var editor2 = new User();
var editor3 = new User();
var post = new Post();

// you can save with the full object or just the ID
post.author.push(author1);
post.editors.push(editor1._id);
post.editors.push(editor2);
post.editors.push(editor3._id);

Promise.all([
    author.save(),
    editor1.save(),
    editor2.save(),
    editor3.save(),
    post.save()
]).then(function(){
    Post
        .find({})
        .populate()
        .then(function(posts){
            console.log(posts);
        });
    
    User
        .find({})
        .populate()
        .then(function(users){
            console.log(users);
        });
});

```