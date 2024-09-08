import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { emailjscred } from "../config/config.js"
import Cookies from 'js-cookie';
import emailjs from 'emailjs-com';


export const ForgotPassword = () => {
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

  async function sendemail(otp,email,name)
  {

    emailjs.send(emailjscred.SERVICE, emailjscred.TEMPLATE, {
      to_name:name,
      otp:otp,
      user_email:email
    },emailjscred.PUBLIC).then(
      (response) => {
        console.log('SUCCESS!', response.status, response.text);
      },
      (error) => {
        console.log('FAILED...', error);
      },
    );

  };

  async function proceed(response, email) {
    if (response.status === 404) {
      alert("Please enter a valid email id");
    } else {
      try {
        const cookie = response.data.cookie;
        const otpResponse = await axios.post("http://localhost:3000/api/v1/user/send-otp",{cookie});
        
        const otp = otpResponse.data.otp;
        const email = otpResponse.data.email;
        const name = otpResponse.data.firstName;

        await sendemail(otp, email, name);
      } catch (error) {
        console.error("Error in proceed function:", error);
        alert("An error occurred while processing your request. Please try again.");
      }
    }
  }

  const handleSubmit = async () => {
    if (!validateEmail(username)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/send-otp-cookie",
        { username }
      );

      const cookie = response.data.cookie;
      localStorage.setItem("userData", cookie);

      await proceed(response, username);
      
      alert("OTP sent successfully");
      navigate("/Verification");
    } catch (error) {
      console.error("OTP page failed:", error);
      if (error.response) {
        if (error.response.status === 404) {
          alert("User not found. Please check your email and try again.");
        } else if (error.response.status === 500) {
          alert("Server error. Please try again later.");
        } else {
          alert(`An error occurred: ${error.response.data.msg || "Please try again later."}`);
        }
      } else if (error.request) {
        alert("No response from server. Please check your internet connection.");
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  function takeback(){
    navigate("/signin");
  }

  return (
    <div style={containerStyle}>
      <div style={{ textAlign: "center" }}>
        <Heading label={"OTP Verification"} />
        <SubHeading label={"We will send you an One Time Password via this email address"} />
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
        <button type="submit" style={buttonStyle} onClick={handleSubmit}>
          Send OTP
        </button> 
        <pre> </pre>
        <button type="submit" style={buttonStyle} onClick={takeback}>
          Back
        </button>
      </div>
    </div>
  );
};
