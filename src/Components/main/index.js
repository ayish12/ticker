import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";

const Main = props => {
  const [dd, setDd] = useState(false);
  const [projectId, setProjectId] = useState("");
  const [finalData, setFinalData] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [count, setCount] = useState(0);
  const [activeTimer, setActiveTimer] = useState(false);
  const [timer, setTimer] = useState({
    id: "",
    startTime: "",
    count: 0
  });

  useEffect(async () => {
    await axios
      .post("http://localhost:8080/task/projectlist", { token })
      .then(res => {
        setProjectData(res.data);
      })
      .catch(err => {
        console.log("err");
      });

    await axios
      .post("http://localhost:8080/task/list", { token })
      .then(res => {
        setTaskList(res.data);
      })
      .catch(err => {
        console.log(err);
      });

    const finalData = [];
  }, []);
  const [formelements, setFormelements] = useState({});
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const usid = localStorage.getItem("userid");

  const Form = (name, value) => {
    setFormelements(formelements => ({ ...formelements, [name]: value }));
    // console.log({ name }, value)
  };

  // console.log(formelements)
  const Proj = (projectname, value) => {
    var pname = formelements.projectname;
    var uid = usid;
    const data = {
      projectname: pname,
      userid: uid
    };
    axios.post("http://localhost:8080/task/project", data);
  };

  const getProjectName = id => {
    const pn = projectData.filter(project => project._id === id);
    console.log({ pn });
    if (pn.length > 0) {
      return pn[0].projectname;
    }
  };
  const setTimerCount = taskId => {
    const updatedData = timer;
    updatedData.id = taskId;
    updatedData.startTime = new Date();
    setActiveTimer(true);
    setTimer(updatedData);
  };
  // const Task = (taskname, value) => {
  //   var tname = formelements.taskname;
  //   var time = new Date();
  //   const data = {
  //     taskname: tname,
  //     starttime: time,
  //     projectid: "5dad6351ba0fa422fc1f67a3",
  //     status: "active",
  //     userid: usid
  //   };
  //   console.log(data);
  //   axios.post("http://localhost:8080/task/add", data);
  // };

  const projectAdding = () => {
    const data = {
      projectname: formelements.projectname,
      userid: usid
    };
    axios.post("http://localhost:8080/task/project", data).then(res => {
      console.log(res);
      const newPrjects = projectData.concat(res.data);
      setProjectData(newPrjects);
      console.log(newPrjects);
    });
  };

  const addTask = () => {
    const data = {
      projectid: projectId,
      taskname: formelements.taskname,
      userid: usid,
      starttime: Date.now(),
      status: "active"
    };
    console.log({ data });
    axios
      .post("http://localhost:8080/task/add", data)
      .then(res => {
        console.log(res.data);
        const updatedData = taskList.concat({ ...res.data });
        setTaskList(updatedData);
      })
      .catch(err => {
        console.log(err);
      });
    console.log("TASK", taskList);
  };

  console.log({ finalData });
  const Time = () => {
    var now = moment();
    console.log(now);
  };
  useEffect(() => {
    if (activeTimer) {
      setTimeout(() => {
        let dd = count;
        setCount(++dd);
      }, 1000);
    }
  }, [count, activeTimer]);

  return (
    <div class="container-fluid">
      <div class="row">
        <div
          class="col-sm-2"
          style={{ backgroundColor: "#1abc9c", minHeight: "100vh" }}
        >
          navbar
        </div>
        <div
          class="col-sm-10"
          style={{ backgroundColor: "#ecf0f1", minHeight: "100vh" }}
        >
          <p>{user}</p> 
          <form
            onSubmit={e => e.preventDefault()}
            style={{ display: "flex", alignItems: "center" }}
          >
            <input
              class="form-control"
              type="text"
              name="taskname"
              placeholder="task"
              value={formelements.projectname}
              onChange={({ target: { name, value } }) => Form(name, value)}
            />
            <div>
              <Dropdown isOpen={dd} toggle={() => setDd(!dd)}>
                <DropdownToggle caret>Select Project</DropdownToggle>
                <DropdownMenu>
                  {projectData.map(({ projectname, _id }) => (
                    <DropdownItem onClick={() => setProjectId(_id)}>
                      {projectname}
                    </DropdownItem>
                  ))}
                  <DropdownItem>
                    <div style={{ backgroundColor: "#eeeeee", padding: "8px" }}>
                      Add Project
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <button
              type="button"
              class="btn btn-primary"
              onClick={() => addTask()}
            >
              Add
            </button>
            <br />
            <br />
            {/* <input
                    class="form-control"
                    type="text" name="taskname" placeholder="taskname" value={formelements.taskname}
                    onChange={({ target: { name, value } }) => Form(name, value)} />
                <button onClick={Task}>Add TASK </button> */}
          </form>

          {projectData.map(project => (
            <div
              style={{
                backgroundColor: "#fff",
                width: "70vw",
                minHeight: "50px",
                borderLeft: "10px solid #1abc9c",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                marginTop: "10px",
                padding: "25px"
              }}
            >
              <div>
                <h3>{project.projectname}</h3>

                {taskList.map(task =>
                  project._id === task.projectid ? (
                    <div
                      style={{
                        backgroundColor: "#fafafa",
                        width: "60vw",
                        minHeight: "50px",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        marginTop: "10px",
                        paddingLeft: "25px"
                      }}
                    >
                      <div className="col-md-12">
                        <div className="row">
                          <div className="col-md-4">
                            <h5>{task.taskname}</h5>
                          </div>

                          <div className="col-md-2">
                            <h5>total hours 14hrs</h5>
                          </div>

                          <div className="col-md-2">
                            <h5></h5>
                          </div>

                          <div className="col-md-2">
                            <button onClick={() => setTimerCount(task._id)}>
                              Start
                            </button>
                          </div>

                          <div className="col-md-2">
                            <h5>{task._id === timer.id ? count : null}</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          ))}

          {/* {projectData.map(project => (
            <div>
              <label>{project.projectname}</label>
              {taskList.map(task =>
                project._id === task.projectid ? <h6>{task.taskname}</h6> : null
              )}
            </div>
          ))} */}
          {/* ))} */}
        </div>
      </div>
    </div>
  );
};
export default Main;
