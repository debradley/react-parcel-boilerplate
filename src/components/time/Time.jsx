import React, { Component } from "react";

import "./styles.css";

const getTime = () => new Date().toLocaleTimeString();

class Time extends Component {
  constructor(props) {
    super(props);
    this.state = { time: getTime() };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({ time: getTime() });
    }, 1000);
  }

  render() {
    return (
      <div className="time">
        <div className="time__text">Hello, Parcel</div>
        <div className="time__now">{this.state.time}</div>
      </div>
    );
  }
}

export default Time;
