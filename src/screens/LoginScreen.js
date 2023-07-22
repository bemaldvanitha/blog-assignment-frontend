import React, { useState } from "react";
import { Button } from "antd";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

import CustomInput from "../components/CustomInput";

import '../styles/LoginScreen.css';
import Navbar from "../components/Navbar";
import CustomAlert from "../components/CustomAlert";

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validAlert, setValidAlert] = useState(false);

    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async () => {
        setValidAlert(false);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmailValid = emailRegex.test(email);
        try {
            if(isEmailValid && password.length >= 6){
                const response = await axios.post('http://localhost:5000/api/user/sign-in',{
                    email: email,
                    password: password
                });

                const token = response.data.token;
                localStorage.setItem('jwtToken', token);
                navigate('/');
            }else{
                setValidAlert(true);
            }
        }catch (err){
            setValidAlert(true);
            console.error(err);
        }
    }

    return(
        <div>
            <Navbar/>
            <div className="login-page-container">
                {validAlert && (
                    <CustomAlert
                        message={'Authentication error'}
                        description={"email should valid and password should have minimum 6 chars or invalid email password"}
                    />
                )}
                <p className="login-page-title">Sign In</p>
                <CustomInput title={'email'} id={'email'} inputValue={email} setValue={handleEmailChange}/>
                <CustomInput title={'password'} id={'password'} inputValue={password} setValue={handlePasswordChange}
                             isPassword={true}/>
                <div className="login-page-button-container">
                    <Button type="primary" onClick={handleLogin} className="login-page-button">
                        Login
                    </Button>

                    <Link to="/register" className="login-page-register-link">
                        Register
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen;