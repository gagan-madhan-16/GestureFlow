export const Button = ({ label, onClick }) => {
    return (
      <div style={styles.container}>
        <button onClick={onClick} type="button" style={styles.button}>
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
      width: "100px",
      padding: "10px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
  };
  