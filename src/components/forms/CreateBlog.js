import { useState } from "react";
import axios from 'axios'

const CreateBlog = (props) => {
  const [formData, setFormData] = useState({
   blog_title: "",
   blog_content: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('https://blogappbackend-8j2e.onrender.com/blogs', formData, {
        headers: {
          'x-auth-token': localStorage.getItem("userToken")
        }
      }).then(res => props.setBlogs([...props.blogs, res.data]))
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className="form-label" htmlFor="title">
        Title
      </label>
      <input
        className="form-control"
        type="text"
        id="blog_title"
        name="blog_title"
        value={formData.blog_title}
        onChange={(e) =>
          setFormData({ ...formData, [e.target.id]: e.target.value })
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
          value={formData.blog_content}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.id]: e.target.value })
          }
        />
      </div>

      <input type="submit" className="btn btn-success" />
    </form>
  );
};

export default CreateBlog;
