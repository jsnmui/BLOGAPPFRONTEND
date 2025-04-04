import RegisterForm from "../forms/RegisterForm";
import LoginForm from "../forms/LoginForm";
import { useState, useEffect } from "react";
import GiphyList from "../GiphyList";
import axios from "axios";

const Landing = (props) => {
  const [giphys, setGiphys] = useState(null);
  const [hasAccount, setHasAccount] = useState(false);
  const {setUser} = props
 
 useEffect(() => {
    axios
      .get("https://api.giphy.com/v1/gifs/trending?api_key=OSsE1u9CyQcBk5DvCIWDvOFrrsnvRv1V&limit=1&rating=g")
      .then((res) => setGiphys(res.data))
      .catch((err) => console.error(err));
    
  }, []);
  
 
  return (
    <div>
      <h1>Landing Page</h1>

      {hasAccount === false ? (
        <div>
          <RegisterForm  setUser={setUser} />
          <p>
            Already have an account?{" "}
            <span className="btn btn-primary" onClick={() => setHasAccount(true)}>Login</span>{" "}
          </p>
        </div>
      ) : (
        <LoginForm setUser={setUser} />
      )}

    {giphys && <GiphyList giphys={giphys} />}
    </div>
  );
};

export default Landing;
