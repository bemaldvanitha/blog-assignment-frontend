import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {Card} from "antd";

import '../styles/UserScreen.css';
import Navbar from "../components/Navbar";

const { Meta } = Card;

const UserScreen = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const fetchUser = async (token) => {
        const response = await axios.get(`http://localhost:5000/api/user`,{
            headers: {
                'x-auth-token': token
            },
        });
        setUser(response.data);
    }

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if(!token){
            navigate('/register')
        }else{
            fetchUser(token);
        }
    },[])

    return(
        <div>
            <Navbar isAuth={true}/>
            <div className="user-container">
                <Card
                        className="user-card"
                        cover={<img src={`data:image/jpeg;base64,${user.profilePic}`} alt="Image" />}
                    >
                        <Meta title={user.username} description={user.email} />
                    </Card>
            </div>
        </div>
    )
}

export default UserScreen;