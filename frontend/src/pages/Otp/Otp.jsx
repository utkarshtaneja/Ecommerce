import React, { useState } from 'react';
import './Otp.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';

const Otp = () => {
    const [otp, setOtp] = useState("");
    const [spinner, setSpinner] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const LoginUser = async (e) => {
        e.preventDefault();

        // Get the email and password from the location state
        const email = location.state.email; 
        const password = location.state.password; 

        if (otp === "") {
            toast.error("Enter Your OTP");
        } else if (!/^[0-9]+$/.test(otp)) {
            toast.error("Enter a Valid OTP");
        } else if (otp.length < 6) {
            toast.error("OTP Length must be at least 6 digits");
        } else {
            setSpinner(true);
            const data = { email, password, otp };  // Send email, password, and OTP to the backend

            try {
                const response = await axios.post(`http://localhost:2000/api/auth/verify-otp`, data);  
                if (response.data.success) {
                    localStorage.setItem("userdbtoken", response.data.userToken);  
                    toast.success(response.data.message);
                    localStorage.setItem("token", response.data.token);
                    
                    setTimeout(() => {
                        navigate("/");
                    }, 3000);
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                toast.error("An error occurred. Please try again.");
            } finally {
                setSpinner(false);
            }
        }
    };

    return (
        <div className='otp-popup'>
            <form className="otp-popup-container">
                <div className="otp-popup-title">
                    <h2>Enter OTP</h2>
                </div>
                <div className="otp-popup-input">
                    <input 
                        type="text" 
                        onChange={(e) => setOtp(e.target.value)} 
                        placeholder='Enter OTP' 
                        required 
                    />
                </div>
                <button onClick={LoginUser}>Verify
                {
                    spinner ? <span><Spinner animation="border" /></span> : ""
                }
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Otp;
