import React from "react";
import "../App.css";

import Static from "./Static";

export default class Login extends React.Component {
  state = {
    initials: "",
    phone: "",
    width: 0,
    height: 0,
  };

  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  handleChange = (key) => (event) => {
    this.setState({ [key]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { initials, phone } = this.state;
    const api_url =
      process.env.NODE_ENV === "production"
        ? "https://boxless.herokuapp.com"
        : "http://localhost:3001";
    const response = await fetch(`${api_url}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ initials, phone }),
    });
    if (response.ok) {
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        const { handleLogin } = this.props;
        handleLogin();
      }
    } else {
      const errMessage = await response.text();
      console.log(errMessage);
    }
  };

  render() {
    const { height, width } = this.state;
    return (
      <div class="login-container">
        <Static width={width} height={height} />
        <div style={styles.loginContainer}>
          <form style={styles.login} onSubmit={this.handleSubmit}>
            <label>
              <input
                style={styles.input}
                type="text"
                value={this.state.initials}
                onChange={this.handleChange("initials")}
                placeholder="Initials"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
            </label>
            <br></br>
            <label>
              <input
                style={styles.input}
                type="text"
                value={this.state.phone}
                onChange={this.handleChange("phone")}
                placeholder="Phone"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
            </label>
            <br></br>
            <input type="submit" value="Enter" />
          </form>
        </div>
      </div>
    );
  }
}

const styles = {
  login: { display: "flex", justifyContent: "center", flexDirection: "column" },
  input: {
    width: "100px",
  },
  loginContainer: {
    height: "100px",
    width: "100px",
    position: "absolute",
    left: "50%",
    marginLeft: "-50px",
    top: "50%",
    marginTop: "-50px",
  },
};
