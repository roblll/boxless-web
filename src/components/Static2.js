import React from "react";
import "../App.css";

export default class Static2 extends React.Component {
  componentDidMount() {
    const script = document.createElement("script");
    script.src = "./static2.js";
    script.async = true;
    document.body.appendChild(script);
  }
  componentWillUnmount() {
    let allsuspects = document.getElementsByTagName("script");
    for (let i = allsuspects.length; i >= 0; i--) {
      if (
        allsuspects[i] &&
        allsuspects[i].getAttribute("src") !== null &&
        allsuspects[i].getAttribute("src").indexOf(`./static2.js`) !== -1
      ) {
        allsuspects[i].parentNode.removeChild(allsuspects[i]);
      }
    }
  }
  render() {
    const { width, height } = this.props;
    return (
      <div style={styles.container}>
        <canvas id="tv2" width={width} height={height}></canvas>
      </div>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
};
