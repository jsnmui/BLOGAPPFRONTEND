import NavBar from "../layout/NavBar";
import CreateBlog from "../forms/CreateBlog";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Home = (props) => {
  const [blogs, setBlogs] = useState(null);
  const history = useHistory()
  useEffect(() => {
    axios
      .get("https://blogappbackend-8j2e.onrender.com/blogs", {
        headers: {
          "x-auth-token": localStorage.getItem("userToken"),
        },
      })
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (blog) => {
    axios
      .delete(`https://blogappbackend-8j2e.onrender.com/blogs/${blog._id}`, {
        headers: {
          "x-auth-token": localStorage.getItem("userToken"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setBlogs([...blogs.filter((t) => t._id !== blog._id)]);
      })
      .catch((err) => console.error(err));
  };

  const handleUpdate = (blog) => {
    history.push(`/update/${blog._id}`)
  }
  return (
    <div>
      <NavBar user={props.user} />
      <h1 className="text-center my-4">Home Page</h1>

      <CreateBlog setBlogs={setBlogs} blogs={blogs} />

      {blogs &&
        blogs.map((blog) => (
          <div className="card mb-3 shadow-sm" key={blog._id}>
            <div className="card-body">
                <h5 className="card-title fw-bold">{blog.blog_title}</h5>
                <p className="card-text"> {blog.blog_content}</p>
                  {blog.creator_id === props.user._id && (
                   <div className="d-flex gap-2 mt-2">
                   <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(blog)}
                    >
                      Delete
                    </button>
                 <button
                    className="btn btn-info"
                    onClick={() => handleUpdate(blog)}
                    >
                      Update
                    </button>
                    </div>
                  )}
            </div>   
          </div>
        ))}
    </div>
  );
};

export default Home;
