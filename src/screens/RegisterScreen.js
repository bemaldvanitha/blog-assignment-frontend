import React, { useState } from "react";
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate, Link } from "react-router-dom";

import CustomInput from "../components/CustomInput";

import '../styles/RegisterScreen.css';
import axios from "axios";
import Navbar from "../components/Navbar";
import CustomAlert from "../components/CustomAlert";

const RegisterScreen = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState([]);
    const [validAlert, setValidAlert] = useState(false);

    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUserName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleChange = (info) => {
        let fileList = [...info.fileList];
        fileList = fileList.slice(-1);

        setProfilePicture(fileList);
    };

    const beforeUpload = (file) => {
        const isImage = file.type.startsWith('image/');
        const isLessThan2MB = file.size / 1024 / 1024 < 2;

        if (!isImage) {
            //message.error('You can only upload image files!');
        }

        if (!isLessThan2MB) {
            //message.error('Image must be smaller than 2MB!');
        }

        return isImage && isLessThan2MB;
    };

    const handleSubmit = async () => {
        setValidAlert(false);
        const formData = new FormData();
        formData.append('username', userName);
        formData.append('email', email);
        formData.append('password', password);
        if (profilePicture.length > 0) {
            formData.append('profilePic', profilePicture[0].originFileObj);
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmailValid = emailRegex.test(email);

        try {
            if(isEmailValid && password.length >= 6 && userName.length >= 3 && profilePicture[0] !== undefined){
                const response = await axios.post('http://localhost:5000/api/user/sign-up', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                const token = response.data.token;
                localStorage.setItem('jwtToken', token);
                navigate('/');
            }else{
                setValidAlert(true);
            }
        } catch (error) {
            setValidAlert(true);
            console.error(error);
        }
    }

    return(
        <div>
            <Navbar/>
            <div className="register-form-container">
                {validAlert && (
                    <CustomAlert
                        message={'Authentication error'}
                        description={"email should valid and password should have minimum 6 chars and user " +
                            "name should have minimum 3 chars and have profile picture"}
                    />
                )}
                <p className="register-form-header">Register</p>
                <CustomInput title={'user name'} id={'username'} inputValue={userName} setValue={handleUsernameChange}/>
                <CustomInput title={'email'} id={'email'} inputValue={email} setValue={handleEmailChange}/>
                <CustomInput title={'password'} id={'password'} inputValue={password} setValue={handlePasswordChange}
                             isPassword={true}/>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    fileList={profilePicture}
                    multiple={false}
                    onChange={(info) => handleChange(info)}
                    beforeUpload={beforeUpload}
                    >
                    {profilePicture.length === 0 && (
                        <div>
                            <UploadOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    )}
                </Upload>
                <Button type="primary" onClick={handleSubmit} className="register-form-button">
                    Register
                </Button>
                <div className="register-form-login-link">
                    Already a member? <Link to="/login" className="register-form-login-link-text">Login here</Link>
                </div>
            </div>
        </div>
    )
}

export default RegisterScreen;