const mongoose = require('mongoose');
require("./../config/");

const TaskSchema = new mongoose.Schema({
  name: mongoose.SchemaTypes.String,
  trash:{
    default: false,
    type:Boolean
  },
  done:{
    default: false,
    type:Boolean
  }
},{
  timestamps:true
});

const Task = mongoose.model('Task',TaskSchema, 'task');


module.exports = {
  Task,
  TaskSchema
}