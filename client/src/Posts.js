
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Posts.css";

const Posts = () => {
  const navigate = useNavigate();
    const { headers } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {

    const res = await axios.get("http://localhost:5000/articles",{ headers });
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);


  return (
    <div className="posts" style={{display:"flex",flexDirection:"column"}}>
            <div style={{textAlign:"center"}}><h1 >All the posts</h1></div>

      <div className="container container-fluid">
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
             
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id}>
                <td> {post.title} </td>
                <td> {post.content} </td>
                                <td> {post.category} </td>
                                                                <td> {post.keywords} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Posts;