export const Button = ({ label, onClick , width}) => {

  const buttonStyle = {
    ...styles.button,
    width: width ? width : "100px",
  };

    return (
      <div style={styles.container}>
        <button onClick={onClick} type="button" style={buttonStyle}>
          {label}
        </button>
      </div>
    );
  };
  
  const styles = {
    container: {
      width: "100%",
      marginBottom: "0.5rem",
    },
    button: {
      padding: "10px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
  };
  