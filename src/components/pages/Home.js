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
      .get("https://jmui-mernblogback.herokuapp.com/blogs", {
        headers: {
          "x-auth-token": localStorage.getItem("userToken"),
        },
      })
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (blog) => {
    axios
      .delete(`https://jmui-mernblogback.herokuapp.com/blogs/${blog._id}`, {
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
      <h1>Home Page</h1>

      <CreateBlog setBlogs={setBlogs} blogs={blogs} />

      {blogs &&
        blogs.map((blog) => (
          <div className="card" key={blog._id}>
            <div className="card-body">
                <h5 className="card-title">{blog.blog_title}</h5>
                
                <p className="card-text"> {blog.blog_content}</p>
                  {blog.creator_id === props.user._id && (
                    <span
                      className="btn btn-danger"
                      onClick={() => handleDelete(blog)}
                    >
                      x
                    </span>
                  )}{" "}
                  
                  {blog.creator_id === props.user._id && (
                    <span
                      className="btn btn-info"
                      onClick={() => handleUpdate(blog)}
                    >
                      Update
                    </span>
                  )}

                
             </div>   
          </div>
        ))}
    </div>
  );
};

export default Home;
