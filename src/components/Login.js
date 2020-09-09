import React from "react";

export default class Login extends React.Component {
  state = {
    initials: "",
    phone: "",
  };

  handleChange = (key) => (event) => {
    this.setState({ [key]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { initials, phone } = this.state;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ initials, phone }),
    };
    const response = await fetch(
      "http://localhost:3001/api/test",
      requestOptions
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      const errMessage = await response.text();
      console.log(errMessage);
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input
            type="text"
            value={this.state.initials}
            onChange={this.handleChange("initials")}
            placeholder="Initials"
          />
        </label>
        <br></br>
        <label>
          <input
            type="text"
            value={this.state.phone}
            onChange={this.handleChange("phone")}
            placeholder="Phone"
          />
        </label>
        <br></br>
        <input type="submit" value="Enter" />
      </form>
    );
  }
}
