import { useEffect, useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ResetPassword = () => {
  
  const [Password, setPassword] = useState("");
  const [Pass2, setPass2] = useState("");
  const [submit, setSubmit] = useState(false);

  const navigate = useNavigate();

  const containerStyle = {
    width: "540px",
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
    if(Password !== Pass2)
    {
      return alert("Please write same password in both fields")
    }
    else
    {
      try {  
        const token = localStorage.getItem("userData");
        const result = await axios.post("http://localhost:3000/api/v1/user/reset-password",{Password,token});
        if(result.status == 200)
        {
          localStorage.removeItem("userData");
          alert("password set successfully!!");
          navigate('/');
        }
        else if(result.status == 201){
          alert("New password can not be same as previous password.\nPlease enter a diff password");
        }
        else{
          alert("password not set \n verify otp again");
          navigate('/forgotpassword');
        }
      } catch (error) {
        alert("internal server error");
      }
    }
  };

  useEffect(() => {
    if (submit) {
      handleSubmit();
      setSubmit(false);
    }
  }, [submit]);

  return (
    <div style={containerStyle}>
      <div style={{ textAlign: "center" }}>
        <Heading label={"Reset your Account Password"} />
        <SubHeading label={"Enter your new password"} />
      </div>
      <div>
        <label style={labelStyle}></label>
        <input
          type="password"
          style={inputStyle}
          // value={otp}
          minLength="6"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder={"New Password"}
        />
        <label style={labelStyle}></label>
        <input
          type="password"
          style={inputStyle}
          // value={otp}
          minLength="6"
          onChange={(e) => {
            setPass2(e.target.value);
          }}
          placeholder={"Confirm Password"}
        />
      </div>
      <div>
      <button style = {buttonStyle} onClick={() => setSubmit(true)}>Reset Password</button>
      </div>
    </div>
  );
};
