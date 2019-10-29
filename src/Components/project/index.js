import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
const Project = props => {
  const [pname, setPname] = useState();
  const [userid, setUserid] = useState();
  const [projectData, setProjectData] = useState([]);
  var token = localStorage.getItem("token");
  useEffect(async () => {
    await axios
      .post("http://localhost:8080/task/projectlist", { token })
      .then(res => {
        setProjectData(res.data);
      })
      .catch(err => {
        console.log("err");
      });
  }, []);
  const project = e => {
    e.preventDefault();
    const data = {
      projectname: pname,
      token: localStorage.getItem("token"),
      userid: localStorage.getItem("userid")
    };

    axios
      .post("http://localhost:8080/task/project", data)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  console.log(pname);
  return (
    <div>
      <form
        className="form"
        style={{
          width: "100%"
        }}
      >
        <h1>project add</h1>
        projectname:
        <br />
        <input
          type="text"
          name="projectname"
          placeholder="projectname"
          onChange={({ target: { value } }) => setPname(value)}
          value={pname}
        />
        <br />
        <br />
        <button onClick={e => project(e)}>ADD</button>
      </form>
    </div>
  );
};
export default withRouter(Project);
