const express = require("express");
const cors = require("cors");
const mongo = require("./database");

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json('server is working');
});


// get request with database
app.get('/tasks', (req, res) => {
  console.log('SERVER:Get Data','get task from server');
  mongo.getTasks((result) => {
    res.json(result);
  })
});

// Post request
app.post('/tasks', (req, res) => {
  console.log('SERVER:Post Data', req.body);
  mongo.createTasks(req.body, (result) => {
    res.json(result);
  })
});

//Put request
app.put('/tasks', (req, res) => {
  console.log('SERVER:Put Data', req.body);
  mongo.editTasks(req.body, (result) => {
    res.json(result);
  })
})

//Delete request
app.delete('/tasks', (req, res) => {
  console.log('SERVER:delete Data', req.body);
  mongo.deleteTask(req.body._id, (result) => {
    res.json(result);
  })
})





const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server listening to ${PORT}`));