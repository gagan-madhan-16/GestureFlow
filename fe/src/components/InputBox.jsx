export const InputBox = ({ label, placeholder, onChange, type }) => {
    return (
      <div>
        <div style={styles.label}>{label}</div>
        <input
          type={type}
          onChange={onChange}
          placeholder={placeholder}
          style={styles.input}
        />
      </div>
    );
  };
  
  const styles = {
    label: {
      fontFamily: "inherit",
      fontWeight: "500",
      fontSize: "0.875rem",
      lineHeight: "1.25rem",
      color: "#4b5563",
      paddingBottom: "0.5rem",
    },
    input: {
      width: "100%",
      padding: "0.5rem",
      border: "1px solid #cbd5e0",
      borderRadius: "0.375rem",
    },
  };
  