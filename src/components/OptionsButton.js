import React from "react";

const OptionsButton = (props) => {
  const { name, on, toggle, label } = props;

  const styles = {
    container: {
      flex: 1,
    },
    button: {
      border: "none",
      cursor: "pointer",
      background: "none",
      height: "100%",
      letterSpacing: "1px",
      fontSize: "inherit",
      transition: "all 0.3s",
      outline: "none",
      margin: "10px",
      color: on ? "#faab1a" : "white",
    },
  };

  return (
    <div style={styles.container}>
      <button style={styles.button} onClick={toggle} name={name}>
        {label}
      </button>
    </div>
  );
};

export default OptionsButton;
