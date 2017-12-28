import React, { Component } from "react";
import { Helmet } from "react-helmet";

import Button from "../button";
import "./styles.css";

const Metadata = () => {
  const site = "React Parcel Boilerplate";
  const description =
    "A learning spike for using parcel with a simple React component.";
  return (
    <Helmet>
      <title>{site}</title>
      <meta name="site" content={site} />
      <meta name="description" content={description} />
      <meta name="og:description" content={description} />
      <meta name="og:locale" content="en_US" />
      <meta name="og:site_name" content={site} />
      <meta name="og:title" content={site} />
      <meta name="og:type" content="article" />
      <meta name="og:url" content={window.location.href} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:site" content={site} />
      <meta name="twitter:title" content={site} />
    </Helmet>
  );
};

export class ColorChooser extends Component {
  constructor(props) {
    super(props);
    this.state = { temperature: undefined };
  }

  setTemperature = temperature => {
    this.setState({ temperature });
    if (temperature === "hot") {
      this.makeItHot();
    }
    if (temperature === "cool") {
      this.makeItCool();
    }
  };

  setCssVar = (name, value) => {
    document.documentElement.style.setProperty(name, value);
  };

  makeItHot = () => {
    this.setCssVar("--primary-background-color", "#FA6800");
    this.setCssVar("--primary-text-color", "#FFCC6F");
  };

  makeItCool = () => {
    this.setCssVar("--primary-background-color", "#405380");
    this.setCssVar("--primary-text-color", "#7384B5");
  };

  render() {
    return (
      <div className="app">
        <Metadata />
        <h1 className="app__prompt">Tell me how you like it</h1>
        <div className="app__choices">
          <Button
            disabled={this.state.temperature === "hot"}
            onClick={() => this.setTemperature("hot")}
          >
            Hot
          </Button>
          <Button
            disabled={this.state.temperature === "cool"}
            onClick={() => this.setTemperature("cool")}
          >
            Cool
          </Button>
        </div>
      </div>
    );
  }
}

export default ColorChooser;
