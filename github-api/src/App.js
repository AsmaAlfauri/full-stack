import React from 'react';
import axios from 'axios';

class App extends React.Component {
  state = {
    items: [],
  }

  createTasks = (data) => {
    axios.post(`http://localhost:9000/tasks`, data)
      .then(response => {
        this.setState({ items: response.data })
        console.log('response.data', response.data);
      })
      .catch(error => {
        console.log("Error", error)
      })
  }

  getTasks = () => {
    console.log('REACT:get');
    axios.get(`http://localhost:9000/tasks`)
      .then(response => {
        this.setState({ items: response.data })
        console.log('React:get response.data', response.data);
      })
      .catch(error => {
        console.log("Error", error)
      })
  }

  editTasks = (item) => {
    console.log("React :Edit ", item);
    axios.put(`http://localhost:9000/tasks`, item)
      .then(response => {
        this.setState({ items: response.data })
        console.log('React:put response.data', response.data);
      })
      .catch(error => {
        console.log("Error", error)
      })
  }

  deleteTask = (item) => {
    console.log ("React :delete ", item)
    axios.delete(`http://localhost:9000/tasks`, item)
      .then(response => {
        this.setState({ items: response.data })
        console.log('React:delete response.data', response.data);
      })
      .catch(error => {
        console.log("Error", error)
      })
  }

  reload = () => {
    window.location.reload();
  }

  render() {
    return (
      <>

      </>
    );
  }
}

export default App;


