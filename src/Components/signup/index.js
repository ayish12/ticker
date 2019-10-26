import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
const Sign = props => {
  const [uname, setUname] = useState();
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const Sign = e => {
    e.preventDefault();
    const data = {
      username: uname,
      email: email,
      password: pass
    };
    Axios.post("http://localhost:8080/user/signup", data)
      .then(res => {
        console.log(res);
        props.history.push("/login");
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div>
      <form
        className="form"
        style={{
          width: "100%"
        }}
      >
        <h1>SIGNUP</h1>
        USERNAME:
        <br />
        <input
          type="text"
          name="Username"
          placeholder="Username"
          onChange={({ target: { value } }) => setUname(value)}
          value={uname}
        />
        <br />
        <br />
        EMAIL:
        <br />
        <input
          type="text"
          name="Email"
          placeholder="email"
          onChange={({ target: { value } }) => setEmail(value)}
          value={email}
        />
        <br />
        <br />
        PASSWORD:
        <br />
        <input
          type="text"
          name="Password"
          placeholder="password"
          onChange={({ target: { value } }) => setPass(value)}
          value={pass}
        />
        <br />
        <br />
        <button onClick={Sign}>SIGNUP</button>
      </form>
      <Link to="/login">Login</Link>
    </div>
  );
};
export default Sign;
