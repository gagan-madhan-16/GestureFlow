import { Link } from "react-router-dom";

export const BottomWarning = ({ label, buttonText, to }) => {
  return (
    <div style={styles.container}>
      <div>{label}</div>
      <Link to={to} style={styles.link}>
        {buttonText}
      </Link>
    </div>
  );
};

const styles = {
  container: {
    fontSize: "0.875rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "0.5rem",
  },
  link: {
    marginLeft: "0.25rem",
    textDecoration: "underline",
    cursor: "pointer",
  },
};
