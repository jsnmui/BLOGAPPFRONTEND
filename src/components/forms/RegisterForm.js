import { useState } from "react";
import axios from 'axios';
import {useHistory } from 'react-router-dom'

const RegisterForm = (props) => {
  const history = useHistory()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  


  const handleSubmit = e => {
    e.preventDefault()
    console.log(formData)

    axios.post('https://blogappbackend-8j2e.onrender.com/auth/registration', formData)
    .then(res => {
        console.log(res.data)

        if (res.data.token && res.data.user){
          localStorage.setItem('userToken', res.data.token)
          props.setUser(res.data.user)
          history.push('/home')
        } else {
          console.error(res.data)
        }
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
        <label className="form-label" htmlFor="username">Username</label>
        <input
          type="text"
          className="form-control"
          id="username"
          name="username"
          value={formData.username}
          onChange={(e) => {
            const updatedData = { ...formData, [e.target.id]: e.target.value };
            console.log(updatedData); // Check the updated state
            setFormData(updatedData);
          }}
        />
        </div>

       <div className="mb-3">
       <label className="form-label" htmlFor="email">Email</label>
        <input
          type="text"
          className="form-control"
          id="email"
          name="email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.id]: e.target.value })
          }
        />
       </div>

        <div className="mb-3">
        <label className="form-label" htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.id]: e.target.value })
          }
        />
        </div>

        <input type='submit' className="btn btn-primary"/>
      </form>
    </div>
  );
};

export default RegisterForm;
