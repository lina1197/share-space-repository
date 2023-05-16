// import React from 'react';

// styling
// import './App.css';

// const Register = () => {

//   return (
//     <div className="form-comp cfb">
//       <h1>Create an Account!</h1>
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
//           Register!
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Register;

import React, { useState } from 'react';
import axios from 'axios';

import './Container.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/register', {
        email: email,
        password: password
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-comp cfb">
      <h1>Create an Account!</h1>
      <form className="sign-up-form cfb" onSubmit={handleSubmit}>
        <label>
          Email:
          <br/>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password:
          <br/>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <br/>
        <button type="submit">
          Register!
        </button>
      </form>
    </div>
  );
};

export default Register;
