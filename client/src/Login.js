// import React from 'react';

// styling
// import './App.css';


// const Login = () => {


//   return (
//     <div className="form-comp cfb">
//       <h1>Login!</h1>
//       <form className="sign-up-form cfb">
//         <label>
//           Email:
//           <br/>
//           <input />
//         </label>
//         <label>
//           Password:
//           <br/>
//           <input />
//         </label>
//         <br/>
//         <button>
//           Login!
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      const { accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      setIsLoggedIn(true);
      alert('Login successful!');
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
          <br/>
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <label>
          Password:
          <br/>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br/>
        <button>
          Login!
        </button>
      </form>
    </div>
  );
};

export default Login;
