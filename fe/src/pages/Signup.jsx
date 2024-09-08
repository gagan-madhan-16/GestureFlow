import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const navigate = useNavigate();

  const styles = {
    container: {
      width: "400px",
      margin: "100px auto",
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    },
    card: {
      textAlign: "center",
    },
    button: {
      marginTop: "20px",
    },
    bottomWarning: {
      marginTop: "20px",
    },
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSignup = async () => {
    if (!validateEmail(username)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    if (!/^[a-zA-Z]+$/.test(firstName)) {
      setFirstNameError("First name should contain alphabetic characters only.");
      return;
    }
    if (!/^[a-zA-Z]+$/.test(lastName)) {
      setLastNameError("Last name should contain alphabetic characters only.");
      return;
    }
  
    try {
      const signupData = {
        username,
        firstName,
        lastName,
        password,
      };
    
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        signupData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } else {
        console.error("Signup failed:", response.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your information to create an account"} />
        <InputBox
          type={"text"}
          onChange={(e) => {
            setFirstName(e.target.value);
            setFirstNameError("");
          }}
          placeholder="John"
          label={"First Name"}
        />
        {firstNameError && <p style={{ color: "red" }}>{firstNameError}</p>}
        <InputBox
          type={"text"}
          onChange={(e) => {
            setLastName(e.target.value);
            setLastNameError("");
          }}
          placeholder="Doe"
          label={"Last Name"}
        />
        {lastNameError && <p style={{ color: "red" }}>{lastNameError}</p>}
        <InputBox
          type={"email"}
          onChange={(e) => {
            setUsername(e.target.value);
            setEmailError("");
          }}
          placeholder="johndoe@gmail.com"
          label={"Email"}
        />
        {emailError && <p style={{ color: "red" }}>{emailError}</p>}
        <InputBox
          type={"password"}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          label={"Password"}
        />
        <div style={styles.button}>
          <Button onClick={handleSignup} label={"Sign up"} />
        </div>
        <BottomWarning
          style={styles.bottomWarning}
          label={"Already have an account?"}
          buttonText={"Sign in"}
          to={"/signin"}
        />
      </div>
    </div>
  );
};
