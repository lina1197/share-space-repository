import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Posts.css";

const Posts = () => {
    
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);


//   const fetchPosts = async () => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       const res = await axios.get("http://localhost:5000/articles", {
//         params: {
//           access_token: token
//         }
//       });
//       setPosts(res.data);
//     } catch (err) {
//       console.error(err);
//       // Handle error
//     }
//   };

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:5000/articles/getUserArticles");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();

  }, []);

  const handleDelete = async (post) => {
    setPosts(posts.filter((p) => p._id !== post._id));
    await axios.delete(`${"http://localhost:5000/articles"}/${post._id}`);
  };

  return (
    <div className="posts">
      <div className="container">
        <button
          onClick={() => navigate("/post/new")}
          className="btn btn-primary mb-4"
        >
          New Post
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Body</th>
              <th>Category</th>
              <th>keywords</th>
              <th>Update</th>
              <th>Delete</th>
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
                    className="btn btn-primary"
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(post)}
                    className="btn btn-danger"
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