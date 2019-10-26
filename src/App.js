import React, { useState } from 'react';
import Navbar from './Components/Navbar'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Sidebar from './Components/Sidebar';
import Login from './Components/login';
import Sign from './Components/signup';
import Main from './Components/main'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/home" component={Main} />
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Sign} />
        </Switch>
        {/* <Navbar userName="Ayish" userEmail="ayisha@gmail.com" />
      <Sidebar task="task1" />
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>  */}
      </div>
    </Router>
  );
}

export default App;
