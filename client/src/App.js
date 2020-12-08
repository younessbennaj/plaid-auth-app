import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios'
import { usePlaidLink } from 'react-plaid-link';
import './App.css';
import { resolve } from 'url';



function App() {
  //Plaid config 

  const [linkToken, setLinkToken] = useState("");

  const onSuccess = useCallback((public_token, metadata) => {

    console.log(public_token);

    const data = JSON.stringify({ "public_token": public_token });
    const config = {
      method: 'post',
      url: 'http://localhost:3000/get_access_token',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

  }, []);

  const config = {
    token: linkToken,
    onSuccess
  };

  const { open, ready, error } = usePlaidLink(config);

  const [email, setEmail] = useState('johndoe@email.com');
  const [password, setPassword] = useState('123456');

  function handleSubmitForm(e) {

    e.preventDefault();

    const data = JSON.stringify({ "email": email, "password": password });

    const config = {
      method: 'post',
      url: 'http://localhost:3000/get_link_token',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        setLinkToken(response.data.link_token);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <div className="App">
      <h1>Hello World</h1>
      <form onSubmit={(e) => handleSubmitForm(e)}>
        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" name="email" id="email" />
        <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" id="password" />
        <input type="submit" value="submit" />
      </form>
      <button onClick={() => open()}>Open</button>
    </div>
  );
}

export default App;
