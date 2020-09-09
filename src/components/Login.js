import React from "react";

export default class Login extends React.Component {
  handleSubmit = () => {
    alert("aa");
  };

  render() {
    return (
      // <form onSubmit={this.handleSubmit}>
      <form onSubmit={this.handleSubmit}>
        <label>
          <input
            type="text"
            // value={this.state.firstName}
            // onChange={this.handleChange("initials")}
            placeholder="Initials"
          />
        </label>
        <br></br>
        <label>
          <input
            type="text"
            // value={this.state.lastName}
            // onChange={this.handleChange("lastName")}
            placeholder="Phone"
          />
        </label>
        <br></br>
        <input type="submit" value="Enter" />
      </form>
    );
  }
}
