import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MoneyTester from './MoneyTester';
import TimeTester from './TimeTester';
import DateTester from './DateTester';
import './App.css';


const BasicExample = () => (
  <Router basename={process.env.PUBLIC_URL}>
    <div>
      <ul>
        <li>
          <Link to="/">Money</Link>
        </li>
        <li>
          <Link to="/time">Time</Link>
        </li>
        <li>
          <Link to="/dates">Date</Link>
        </li>
      </ul>

      <hr />

      <Route exact path="/" component={MoneyTester} />
      <Route path="/time" component={TimeTester} />
      <Route path="/dates" component={DateTester} />
    </div>
  </Router>
);

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);


class TopLevelApp extends Component {
  render() {
    return <BasicExample/>;
  }
}

export default TopLevelApp;
