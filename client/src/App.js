import React from 'react'
import axios from 'axios'
import './App.css';



function App() {

  function handleSubmitForm(e) {
    e.preventDefault();
    axios.get('http://localhost:3000')
      .then(response => {
        console.log(response.data);
      })
  }
  return (
    <div className="App">
      <h1>Hello World</h1>
      <form onSubmit={(e) => handleSubmitForm(e)}>
        <input type="email" name="email" id="email" />
        <input type="password" name="password" id="password" />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}

export default App;
