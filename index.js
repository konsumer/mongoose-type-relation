var mongoose = require('mongoose');
var inflection = require('inflection');

function Relation (path, options) {
	mongoose.Schema.ObjectId.call(this, path, options);
}
Relation.prototype.__proto__ = mongoose.Schema.ObjectId.prototype;

// if it's an instance, just add ID
Relation.prototype.cast = function (val) {
	return (typeof val === 'object') ? val._id : val;
};

mongoose.SchemaTypes.Relation = module.exports = Relation;