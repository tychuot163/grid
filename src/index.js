import React from "react";
import ReactDOM from "react-dom";
import { config } from "react-spring";
import Grid from "./Grid";
import { Slug, Fade } from "./Primitives";
import data from "./data";
import "./styles.css";
import "antd/dist/antd.css";
import { Icon } from "antd";

class Cell extends React.Component {
  render() {
    const { toggle, name, description, css, active } = this.props;
    return (
      <div
        className="cell"
        style={{ backgroundImage: css, cursor: !active ? "pointer" : "auto" }}
        onClick={!active ? toggle : undefined}
      >
        <Fade show={active} delay={active ? 500 : 0}>
          <div className="details">
            <Slug delay={600}>
              <div className="circle" style={{ background: css }} />
              <div className="close">
                <Icon
                  type="close"
                  style={{ cursor: "pointer" }}
                  onClick={toggle}
                />
              </div>
              <h1>{name}</h1>
              <p>{description}</p>
            </Slug>
          </div>
        </Fade>
        <Fade
          show={!active}
          from={{ opacity: 0, transform: "translate3d(0,140px,0)" }}
          enter={{ opacity: 1, transform: "translate3d(0,0px,0)" }}
          leave={{ opacity: 0, transform: "translate3d(0,-50px,0)" }}
          delay={active ? 0 : 400}
        >
          <div className="default">
            <div style={{ zIndex: 1 }}>{name}</div>
          </div>
        </Fade>
      </div>
    );
  }
}

class App extends React.Component {
  state = { data };
  render() {
    return (
      <Grid
        className="grid"
        data={this.state.data}
        keys={d => d.name}
        heights={d => d.height}
        columns={2}
        margin={30}
        lockScroll={false}
        closeDelay={500}
        config={config.slow}
      >
        {(data, active, toggle) => (
          <Cell {...data} active={active} toggle={toggle} />
        )}
      </Grid>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
