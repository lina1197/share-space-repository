
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

  const handleDelete = async (post) => {

    setPosts(posts.filter((p) => p._id !== post._id));
    await axios.delete(`${"http://localhost:5000/articles"}/${post._id}`,{ headers });
  };

  return (
    <div className="posts">
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
              <th style={{ width: '7.5%' }}>Update</th>
              <th style={{ width: '7.5%' }}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id}>
                <td> {post.title} </td>
                <td> {post.content} </td>
                                <td> {post.category} </td>
                                                                <td> {post.keywords} </td>


                <td>
                  <button
                    onClick={() => navigate(`/post/${post._id}`)}
                    className="btn btn-primary btn-sm"
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(post)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Posts;