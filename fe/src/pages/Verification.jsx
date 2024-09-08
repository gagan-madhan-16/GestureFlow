import { useEffect, useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Verification = () => {
  
  const [otp, setotp] = useState("");
  const [submit, setSubmit] = useState(false);

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

  const handleSubmit = async () => {       
    try {
    const token = localStorage.getItem("userData");
    const result = await axios.post("http://localhost:3000/api/v1/user/verify-otp",{otp,token});
      
    if(result.status===200)
    {
      alert("otp verified successfully");
      navigate("/reset-password");
    }
    else if(result.status === 204)
    {
      alert("invalid otp")
    }
    else if(result.status === 201)
    {
      localStorage.removeItem("userData");
      alert("OTP has expired")
    }
    else{
      alert("internal server error");
    }

    } catch (error) {
      console.log(error);
      alert("internal server error try again later");  
    }
  };

  useEffect(() => {
    if (submit) {
      handleSubmit();
      setSubmit(false);
    }
  }, [submit]);

  function takeback(){
    navigate("/forgotpassword");
  }

  return (
    <div style={containerStyle}>
      <div style={{ textAlign: "center" }}>
        <Heading label={"Enter your Verification code"} />
        <SubHeading label={"Enter The 6-Digit OTP you recieved on your given email address"} />
      </div>
      <div>
        <label style={labelStyle}>OTP</label>
        <input
          type="text"
          style={inputStyle}
          value={otp}
          maxLength="6"
          onChange={(e) => {
            setotp(e.target.value);
          }}
          placeholder={"123456"}
        />
      </div>
      <div>
      <button style = {buttonStyle} onClick={() => setSubmit(true)}>Verify OTP</button>
      <pre> </pre>
        <button type="submit" style={buttonStyle} onClick={takeback}>
          Back
        </button>
      </div>
    </div>
  );
};
