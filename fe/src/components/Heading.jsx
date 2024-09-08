export const Heading = ({ label }) => {
    return <div style={styles.heading}>{label}</div>;
  };
  
  const styles = {
    heading: {
      fontWeight: "bold",
      fontSize: "2.25rem",
      paddingTop: "1.5rem",
    },
  };
  