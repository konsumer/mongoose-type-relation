var mongoose = require('mongoose');
var inflection = require('inflection');

function setter(val, field){
	// console.log('set', field.path, 'to', field.options.ref, ':', val);

	// find the other model & fieldref & add this model
	var Other = mongoose.models[field.options.ref];

	if (Array.isArray(val[field.options.fieldref])){
		val[field.options.fieldref].push(this._id);
	}else{
		val[field.options.fieldref] = this._id;
	}

	return (typeof val === 'object') ? val._id : val;
}

function getter(){
	console.log(arguments);
}

function Relation (path, options) {
	options.set = setter;
	options.get = getter;
	mongoose.Schema.ObjectId.call(this, path, options);
}

Relation.prototype.__proto__ = mongoose.Schema.ObjectId.prototype;
mongoose.SchemaTypes.Relation = module.exports = Relation;