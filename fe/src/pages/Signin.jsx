import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const containerStyle = {
    width: "400px",
    margin: "100px auto",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "5px",
    color: "#555",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box",
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async () => {
    if (!validateEmail(username)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        { username, password }
      );
      localStorage.setItem("token", response.data.token);
      window.location.href = "/smartboard.html";
    } catch (error) {
      console.error("Signin failed:", error);
      alert("Signin failed. Please check your credentials and try again.");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={{ textAlign: "center" }}>
        <Heading label={"Sign In"} />
        <SubHeading label={"Enter your credentials to access your account"} />
      </div>
      <div>
        <label style={labelStyle}>Email</label>
        <input
          type="email"
          style={inputStyle}
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setEmailError("");
          }}
          placeholder={"johndoe@example.com"}
        />
        {emailError && <p style={{ color: "red" }}>{emailError}</p>}
      </div>
      <div>
        <label style={labelStyle}>Password</label>
        <input
          type="password"
          style={inputStyle}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={"password"}
        />
      </div>
      <div>
        <button type="submit" style={buttonStyle} onClick={handleSubmit}>
          Sign In
        </button>
      </div>
      <BottomWarning
        label={"Don't have an account?"}
        buttonText={"Sign up"}
        to={"/signup"}
      />
      <BottomWarning
        label={""}
        buttonText={"Forgot your password"}
        to={"/forgotpassword"}
      />
    </div>
  );
};
