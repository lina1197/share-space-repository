

// export default App;
import React from 'react';
import { Route,Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';

// styling
// import './App.css';

// components 
import Container from './Container';
import Posts from './Posts';
import Post from './Post';
import DashboardNavbar from './DashboardNavbar';
const App = () => {
  return (
    <AuthProvider><div >
      <Routes>
                <Route path="/" element={ <div className="App cfb"><Container/></div> } />
                                <Route path="/Dashboard" element={<div><DashboardNavbar/> <Posts/></div> } />

        <Route path="/post/:id" element={<Post />} />


    

      </Routes>
    </div></AuthProvider>
    
  );
}

export default App;