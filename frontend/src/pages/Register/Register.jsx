import { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';

const Register = () => {
  const [passhow, setPassShow] = useState(false);
  const [spiner, setSpinner] = useState(false);
  const navigate = useNavigate();
  const [inputdata, setInputdata] = useState({
    name: "",
    email: "",
    password: "",
    mobile: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputdata({ ...inputdata, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, mobile } = inputdata;

    // Input validation
    if (name === "") {
      toast.error("Enter Your Name");
    } else if (email === "") {
      toast.error("Enter Your Email");
    } else if (!email.includes("@")) {
      toast.error("Enter Valid Email");
    } else if (password === "") {
      toast.error("Enter Your Password");
    } else if (password.length < 8) {
      toast.error("Password length minimum 8 characters");
    } else if (mobile == "") {
      toast.error("Enter mobile number");
    } else {
      setSpinner(true);
      try {
        const response = await axios.post(`http://localhost:2000/api/auth/register`, inputdata); 

        if (response.status === 200) {
          setInputdata({ name: "", email: "", password: "" });
          toast.success("User registered successfully.");
          setTimeout(() => {
            navigate("/login");
          }, 3000)
        } else {
          toast.error(response.data.error);
        }
      } catch (error) {
        console.log(error);
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className='signup-popup'>
      <form className="signup-popup-container" onSubmit={handleSubmit}>
        <div className="signup-popup-title">
          <h2>Sign Up</h2>
        </div>
        <div className="signup-popup-input">
          <input type="text" name="name" onChange={handleChange} value={inputdata.name} placeholder='Your name' required />
          <input type="email" name="email" onChange={handleChange} value={inputdata.email} placeholder='Your email' required />
          <input type="number" name="mobile" onChange={handleChange} value={inputdata.mobile} placeholder='Your mobile' required />
          <div className="password-container">
            <input type={!passhow ? "password" : "text"} name="password" onChange={handleChange} value={inputdata.password} placeholder='Your password' required />
            <div className='showpass' onClick={() => setPassShow(!passhow)}>
              {!passhow ? "Show" : "Hide"}
            </div>
          </div>
        </div>
        <button type="submit">Create account
          {spiner ? <span><Spinner animation="border" variant="light" size="sm" /></span> : ""}
        </button>
        <ToastContainer autoClose={5000} hideProgressBar closeButton={false} />
      </form>
    </div>
  );
};

export default Register;
