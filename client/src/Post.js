import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import axios from "axios";
import "./Post.css";
import { useParams, useNavigate } from "react-router-dom";
const Post = () => {
  const navigate = useNavigate();
  const { id } = useParams();
    const { headers } = useContext(AuthContext); // Access the headers from the context

  const [post, setPost] = useState({
    title: "",
    content: "",
    author:"6458f814855d1a1442f16fde",
    category:"",
    keywords:"",

  });

  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {

      const { data } = await axios.get(`${"http://localhost:5000/articles"}/${id}`,{ headers });
      setPost(data);
    };
    fetchPost();
  }, []);

  const handleChange = (e) => {
    const postClone = { ...post };
    postClone[e.target.name] = e.target.value;
    setPost(postClone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id === "new") {
      await axios.post("http://localhost:5000/articles", post,{ headers });
      return navigate("/Dashboard");
    } else {
      await axios.put(`${"http://localhost:5000/articles"}/${id}`, post,{ headers });
      return navigate("/Dashboard");
    }
  };

  return (
    <div className="post__wrapper">
      <div className="container">
        <form className="post">
          <input
            type="text"
            placeholder="Title..."
            name="title"
            value={post.title}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Content..."
            name="content"
            value={post.content}
            onChange={handleChange}
          />
           <input
            type="text"
            placeholder="category..."
            name="category"
            value={post.category}
            onChange={handleChange}
          />
           <input
            type="text"
            placeholder="keywords..."
            name="keywords"
            value={post.keywords}
            onChange={handleChange}
          />
          <button onClick={handleSubmit} className="btn btn-primary">
            {id === "new" ? "Post" : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Post;