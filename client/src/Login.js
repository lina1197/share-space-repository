

import './Container.css';

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    // const { setAuthHeaders } = useContext(AuthContext);
  const { setAuthHeaders, setUser } = useContext(AuthContext);

  // const [user, setUser] = useState()

  const nav = useNavigate();
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user');

    if (accessToken && user) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      setAuthHeaders({ Authorization: `Bearer ${accessToken}` });
      setUser(JSON.parse(user));
      nav('/dashboard');
    }
  }, []);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  
const handleLogin = async (event) => {
  event.preventDefault();
  
  try {

    const response = await axios.post('http://localhost:5000/login', { email, password });
      setUser(response.data)
       const accessToken  =  response.data.accessToken;

localStorage.setItem('accessToken', accessToken); // Set the access token in local storage
   
      //  localStorage.setItem('user', response.data)
  // console.log(response.data)
      localStorage.setItem('user', JSON.stringify(response.data));

    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`; // Set the default Authorization header for all subsequent
          setAuthHeaders({ Authorization: `Bearer ${accessToken}` }); // Set the authorization headers in the context
 
    alert('Login successful!');
    nav('/Dashboard');
  } catch (error) {
    console.error(error);
    alert('Login failed!');
  }
};



  return (
    <div className="form-comp cfb">
      <h1>Login!</h1>
      <form className="sign-up-form cfb" onSubmit={handleLogin}>
        <label>
          Email:
          <br />
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <label>
          Password:
          <br />
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <button>Login!</button>
      </form>
    </div>
  );
};

export default Login;
