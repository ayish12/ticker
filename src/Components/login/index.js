import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
const Login = props => {
  const [uname, setUname] = useState();
  const [pass, setPass] = useState();
  const login = e => {
    e.preventDefault();
    // console.log(uname, pass)
    const data = {
      username: uname,
      password: pass
    };

    axios
      .post("http://192.168.35.39:8080/user/login", data)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        // var token = localStorage.getItem(token)
        localStorage.setItem("user", res.data.log.logusername);
        // var user = localStorage.getItem(user)
        localStorage.setItem("userid", res.data.log.loguserid);
        console.log(res);
        props.history.push("/home");
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div className="container" style={{ width: "100%", margin: "0 auto" }}>
      <div
        className="container"
        style={{
          width: "100%",
          minheight: "100vh",
          display: "-webkit-box",
          display: "-webkit-flex",
          display: "-moz-box",
          display: "-ms-flexbox",
          display: "flex",
          flexwrap: "wrap",
          justifycontent: "center",
          alignitems: "center",
          padding: "15px",

          backgroundcolor: "bg-success"
          // padding: "150px"
        }}
      >
        <form
          className="form"
          style={{
            width: "100%"
          }}
        >
          <span
            className="login"
            style={{
              fontfamily: "Raleway-Medium",
              fontsize: "30px",
              color: "#555555",
              lineheight: "1.2",
              texttransform: "uppercase",
              textalign: "left",

              width: "100%",
              display: "block"
            }}
          >
            <h1> ACCOUNT LOGIN</h1>
          </span>
          <span
            className="txt1 p-b-11"
            style={{
              fontfamily: "Raleway-SemiBold",
              fontsize: "13px",
              color: "#555555",
              lineheight: "1.4",
              texttransform: " uppercase"
            }}
          >
            USERNAME
          </span>

          {/* USERNAME: */}
          <br />
          <br />
          <div className="input-group input-group-lg">
            <div className="col-xs-4">
              <input
                style={{ borderColor: "rgba(126, 239, 104, 0.8)" }}
                type="text"
                className="form-control input-lg"
                name="Username"
                placeholder="Username"
                onChange={({ target: { value } }) => setUname(value)}
                value={uname}
              />
              <br />
              <br />
              <br />
            </div>
          </div>
          <span
            className="txt1 p-b-11"
            style={{
              fontfamily: "Raleway-SemiBold",
              fontsize: "13px",
              color: "#555555",
              lineheight: "1.4",
              texttransform: " uppercase"
            }}
          >
            PASSWORD
          </span>

          <br />
          <br />
          <div className="input-group input-group-lg">
            <div className="col-xs-4">
              <input
                style={{
                  borderColor: "rgba(126, 239, 104, 0.8)",
                  className: "rounded"
                }}
                type="password"
                className="form-control input-lg"
                name="Password"
                placeholder="Password"
                onChange={({ target: { value } }) => setPass(value)}
                value={pass}
              />
            </div>
          </div>
          <br />
          <br />
          <div className="flex-sb-m w-full p-b-48">
            <div
              className="checkbox"
              style={{
                paddingtop: "16px"
              }}
            >
              <label>
                <input type="checkbox"></input> Remember me
              </label>
            </div>
            <div>
              <p>Forgot password?</p>
            </div>
          </div>
          <div className="container">
            <button
              style={{
                borderradius: "16px",
                border: "none",

                padding: "10px 20px",
                textalign: "center",
                textdecoration: "none",
                display: "inlineblock",
                margin: "4px 2px",
                cursor: "pointer"
              }}
              type="button"
              className="btn btn-dark"
              onClick={login}
            >
              LOGIN
            </button>
            <p>
              <Link to="/signup">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
export default withRouter(Login);
