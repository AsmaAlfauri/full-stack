const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Repos', { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', function () {
  console.log('mongoose connection error');
  console.log('____________________________')
});

db.once('open', function () {
  console.log('mongoose connected successfully');
  console.log('____________________________')
});


// My schema
let tasksSchema = new mongoose.Schema({
  title: String,
  language: String,
  private: Boolean
});

// My modal
let Tasks = mongoose.model('tasks', tasksSchema);

// Get function
let getTasks = (cb) => {
  Tasks.find({}, (err, data) => {
    if (err) {
      cb(err)
    } else {
      console.log('DB:Get data:', data);
      cb(data)
    }
  })
}

// create function
let createTasks = (newTask, cb) => {
  console.log('DB:CreateTasks', newTask);
  Tasks.create(newTask, (err, data) => {
    if (err) {
      cb(err)
    } else {
      console.log('DB:createTasks My data', data);
      getTasks(cb)
    }
  })
}

//Update function 
let editTasks = (togPrivate, cb) => {
  Tasks.findByIdAndUpdate(togPrivate._id, { $set: { private: !togPrivate.private } }, (err, data) => {
    if (err) {
      cb(err)
    } else {
      console.log('DB:editTasks my data', data);
      getTasks(cb)
    }
  })
}

//delete function
let deleteTask = (deleteItem, cb) => {
  console.log('DB:deleteItem', deleteItem);
  Tasks.findOneAndDelete(deleteItem, (err, data) => {
    if (err) {
      cb(err)
    } else {
      console.log('DB:deleteTask My data:', data);
      getTasks(cb)
    }
  })
}


// example of module.export
module.exports = {
  getTasks,
  createTasks,
  editTasks,
  deleteTask
}
