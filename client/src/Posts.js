
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Posts.css";

const Posts = () => {
  const navigate = useNavigate();
    const { headers } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
const [filters, setFilters] = useState({});


  // const fetchPosts = async () => {

  //   const res = await axios.get("http://localhost:5000/articles",{ headers });
  //   setPosts(res.data);
  // };

   const fetchPosts = async () => {
    const res = await axios.get("http://localhost:5000/articles/filterArticles", {
      headers,
      params: filters
    });
    setPosts(res.data);
  };
  
  // const handleFilterChange = (event) => {
  //   const { name, value } = event.target;
    
  //   setFilters(prevFilters => ({
  //     ...prevFilters,
  //     [name]: value
  //   }));
  // };

  const handleFilterChange = (event) => {
  const { name, value } = event.target;
  setFilters(prevFilters => {
    const updatedFilters = { ...prevFilters };
    if (value === "") {
      delete updatedFilters[name];
    } else {
      updatedFilters[name] = value;
    }
    return updatedFilters;
  });
};
  const handleResetFilters = () => {
    setFilters({});
    clearInputValues();
  };
  const handleFilterSubmit = (event) => {
    event.preventDefault();
    fetchPosts();
  };
const clearInputValues = () => {
    const inputElements = document.querySelectorAll('input[name]');
    inputElements.forEach((input) => {
      input.value = '';
    });
  };
  useEffect(() => {
    fetchPosts();
  }, [filters]);

  // useEffect(() => {
  //   fetchPosts();
  // }, []);


  return (
    <div className="posts" style={{display:"flex",flexDirection:"column"}}>
            <div style={{textAlign:"center"}}><h1 >All the posts</h1></div>

      <div className="container container-fluid">
        <h6 >Filter posts by:</h6>
 <form onSubmit={handleFilterSubmit}>
   <div className="mb-2 ">
    
            <label className="filter-label">Title:</label>
            <input className="filter-input" type="text" name="title" value={filters.title || ''} onChange={handleFilterChange} />
          </div>
          <div className="mb-2">
            <label className="filter-label">Category:</label>
            <input className="filter-input" type="text" name="category" value={filters.category || ''} onChange={handleFilterChange} />
          </div>
         
          <div className="mb-2">
            <label className="filter-label">Keywords:</label>
<input className="filter-input" type="text" name="keywords" value={filters.keywords || ''} onChange={handleFilterChange} />          </div>
          
          <button style={{marginBottom:"10px"}} type="button" className="btn btn-secondary btn-sm" onClick={handleResetFilters}>Reset Filters</button>
        </form>


        <button
          onClick={() => navigate("/post/new")}
          className="btn btn-primary btn-sm mb-4"
        >
          New Post
        </button>
        <table className="table table-responsive">
          <thead>
            <tr>
              <th style={{ width: '20%' }}>Title</th>
              <th style={{ width: '40%' }}>Body</th>
              <th style={{ width: '10%' }}>Category</th>
              <th style={{ width: '15%' }}>keywords</th>
                            <th style={{ width: '15%' }}>Author-id</th>

             
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id}>
                <td> {post.title} </td>
                <td> {post.content} </td>
                                <td> {post.category} </td>
                                                                <td> {post.keywords} </td>
                                                                                                                                <td> {post.author} </td>

              </tr>
            ))}
          </tbody>
          
        </table>
      </div>
    </div>
  );
};

export default Posts;