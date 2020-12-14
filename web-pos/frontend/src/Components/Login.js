import React, { useState } from "react";
import Axios from "axios";
import Alert from 'react-bootstrap/Alert'

function Login(props) {
	const [userName, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [err, setErr] = useState("");

	const login = () => {
		Axios.post('http://localhost:4000/user/login', {
			username: userName,
			password: password,
		}).then((response) => {
			if (response.data.message) {
				if (response.data.message) {
        setErr(response.data.message);
      } else {
        props.history.push('/');
      }
			}
		});
	};

  return (
    <div>
      <h3>Login</h3>

      <div className="form-group">
          <label>Username</label>
          <input type="text" className="form-control" placeholder="Enter username" 
            onChange={(e) => {
            	setUsername(e.target.value);
            }} 
          />
      </div>

      <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" placeholder="Enter password" 
            onChange={(e) => {
            	setPassword(e.target.value);
            }}
          />
      </div>
      <button type="sumbit" className="btn btn-primary btn-block" onClick={login}>Login</button>
      {err ? (
        <Alert variant='danger'>{err}</Alert>
      ) : (
        <p className="forgot-password text-right">
            Not yet registered <a href="/register">sign up?</a>
        </p>
      )}
    </div>
  );
}

export default Login;