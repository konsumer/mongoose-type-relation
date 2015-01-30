var mongoose = require('mongoose');
var inflection = require('inflection');

function Relation (path, options) {
  mongoose.Schema.ObjectId.call(this, path, options);
}
Relation.prototype.__proto__ = mongoose.Schema.ObjectId.prototype;

Relation.prototype.cast = function (val, scope, init) {
  try{
    var otherKey = val.constructor.schema.paths[this.options.fieldref].path;
    // console.log(scope.constructor.modelName + '.' + this.path, '=', val.constructor.modelName + '.' + otherKey);
    if (Array.isArray(val[otherKey])){
      if (val[otherKey].indexOf(scope._id) === -1){
        val[otherKey].push(scope._id);
      }
    }else{
      val[otherKey] = scope._id;
    }
  }catch(e){
    
  }

  return (val.constructor.name === 'model' && typeof val._id !== 'undefined') ? val._id : val;
};

mongoose.SchemaTypes.Relation = module.exports = Relation;
mongoose.Types.Relation = mongoose.Schema.ObjectId;