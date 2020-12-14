import React, { useState } from "react";
import Axios from "axios";
import Alert from 'react-bootstrap/Alert'

function Register(props) {
	const [userName, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [userRole, setUserRole] = useState("");
  const [err, setErr] = useState("");

	const register = () => {
		Axios.post("http://localhost:4000/user/register", {
			username: userName,
			password: password,
			user_role: userRole,
		}).then((response) => {
			if (response.data.message) {
        setErr(response.data.message);
      } else {
        props.history.push('/');
      }
		});
	};

  return (
    <div>
      <h3>Sign Up</h3>

      <div className="form-group">
          <label>Username</label>
          <input type="text" className="form-control" placeholder="username"
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

      <div className="form-group">
          <label>User Role</label>
          <input type="text" className="form-control" placeholder="user role" 
            onChange={(e) => {
            	setUserRole(e.target.value);
            }} 
          />
      </div>

      <button type="submit" className="btn btn-primary btn-block" onClick={register}>Sign Up</button>
      {err ? (
        <Alert variant='danger'>{err}</Alert>
      ) : (
        <p className="forgot-password text-right">
            Already registered <a href="/login">sign in?</a>
        </p>
      )}
    </div>
  );
}

export default Register;