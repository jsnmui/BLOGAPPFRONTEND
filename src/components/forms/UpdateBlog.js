import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const Updateblog = (props) => {
  const [blog, setblog] = useState(null);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`http:///localhost:5000/blogs/${id}`, {
        headers: {
          "x-auth-token": localStorage.getItem("userToken"),
        },
      })
      .then((res) => {
        console.log(res.data)
        setblog(res.data)
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/blogs/${id}`, blog, {
        headers: {
          'x-auth-token': localStorage.getItem("userToken")
        }
      }).then(res => history.push('/home'))
  };

  return (
    <div>
      {blog && (
        <form onSubmit={handleSubmit}>
          <label className="form-label" htmlFor="title">
            Title
          </label>
          <input
            className="form-control"
            type="text"
            id="blog_title"
            name="blog_title"
            value={blog.blog_title}
            onChange={(e) =>
              setblog({ ...blog, [e.target.id]: e.target.value })
            }
          />

          <div className="mb-3">
            <label className="form-label" htmlFor="details">
              Details
            </label>
            <input
              className="form-control"
              type="text"
              id="blog_content"
              name="blog_content"
              value={blog.blog_content}
              onChange={(e) =>
                setblog({ ...blog, [e.target.id]: e.target.value })
              }
            />
          </div>

          <input
            type="submit"
            className="btn btn-success"
            value="Update blog"
          />
        </form>
      )}
    </div>
  );
};

export default Updateblog;