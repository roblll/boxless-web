import React from "react";
import "../App.css";

import Static from "./Static";

export default class Login extends React.Component {
  state = {
    username: "",
    password: "",
    width: 0,
    height: 0,
  };

  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };
  componentDidMount() {
    const query = new URLSearchParams(window.location.search);
    const username = query.get("username");
    const password = query.get("password");
    window.addEventListener("resize", this.updateDimensions);
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
      username,
      password,
    });
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  handleChange = (key) => (event) => {
    this.setState({ [key]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const api_url =
      process.env.NODE_ENV === "production"
        ? "https://boxless.herokuapp.com"
        : "http://localhost:3001";
    const response = await fetch(`${api_url}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
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
      <div className="login-container">
        <Static width={width} height={height + 100} />
        <div style={styles.loginContainer}>
          <form style={styles.login} onSubmit={this.handleSubmit}>
            <label>
              <input
                style={styles.input}
                type="text"
                value={this.state.username}
                onChange={this.handleChange("username")}
                placeholder="username"
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
                value={this.state.password}
                onChange={this.handleChange("password")}
                placeholder="password"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
            </label>
            <br></br>
            <input style={styles.button} type="submit" value="enter" />
          </form>
        </div>
      </div>
    );
  }
}

const styles = {
  title: {
    color: "white",
    height: "100px",
  },
  login: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  input: {
    fontSize: "16px",
    width: "200px",
    height: "48px",
    backgroundColor: "rgba(0,0,0,0.5)",
    border: "none",
    color: "white",
    padding: "0 20px",
    borderRadius: "0px",
    textAlign: "center",
  },
  button: {
    fontSize: "16px",
    width: "200px",
    height: "48px",
    backgroundColor: "rgba(0,0,0,0.5)",
    border: "none",
    color: "white",
    padding: "0 20px",
    borderRadius: "0px",
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
