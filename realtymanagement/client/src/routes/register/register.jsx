import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import bg from "./bg.png"
import axios from "axios";
import { useState } from "react";
import apiRequest from "../../lib/apiRequest";
function Register() {

  const [error,setError] = useState("");
  const [isLoading,setIsLoading] = useState(false);
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
      e.preventDefault()
      setIsLoading(true);
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const phoneNumber = formData.get("phoneNumber");  // Extract phone number
   
    try{
      
    const res = await apiRequest.post("/auth/register",{
      username,email,password,phoneNumber
    })

    navigate("/login")
  }catch(err){
    setError(err.response.data.message)
  }finally{
    setIsLoading(false);
  }

  };
  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <input
    name="phoneNumber"
    type="text"
    placeholder="Phone Number"
    maxLength="10"
    pattern="\d{10}"
    title="Please enter a valid 10-digit phone number"
    required
  />
          <button disabled={isLoading}>Register</button>
          {error && <span>{error}</span>}
          <Link to="/login">Already have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src={bg} alt="" />
      </div>
    </div>
  );
}

export default Register;