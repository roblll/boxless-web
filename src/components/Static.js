import React from "react";
import "../App.css";

export default class Static extends React.Component {
  componentDidMount() {
    const script = document.createElement("script");
    script.src = "./static.js";
    script.async = true;
    document.body.appendChild(script);
  }
  componentWillUnmount() {
    let allsuspects = document.getElementsByTagName("script");
    for (let i = allsuspects.length; i >= 0; i--) {
      if (
        allsuspects[i] &&
        allsuspects[i].getAttribute("src") !== null &&
        allsuspects[i].getAttribute("src").indexOf(`./static.js`) !== -1
      ) {
        allsuspects[i].parentNode.removeChild(allsuspects[i]);
      }
    }
  }
  render() {
    const { width, height, maxWidth } = this.props;
    return (
      <div style={styles.container}>
        <canvas
          id="tv"
          style={{ height: height, width: width, maxWidth: maxWidth }}
        ></canvas>
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
