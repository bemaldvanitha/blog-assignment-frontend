import React, { useState, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import Navbar from "../components/Navbar";
import {Button, DatePicker} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import CustomAlert from "../components/CustomAlert";

import '../styles/AddBlogScreen.css';

const AddBlogScreen = () => {
    const navigate = useNavigate();
    const [blogHeader, setBlogHeader] = useState('');
    const [blogBody, setBlogBody] = useState('');
    const [postedDate, setPostedDate] = useState(null);
    const [validAlert, setValidAlert] = useState(false);

    let { id } = useParams();

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if(!token){
            navigate('/register')
        }
    },[]);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if(!token){
            navigate('/register')
        }else{
            if(id){
                fetchCurrentData(token);
            }
        }
    },[id]);

    const fetchCurrentData = async (token) => {
        try{
            const response = await axios.get(`http://localhost:5000/api/blog/${id}`,{
                headers: {
                    'x-auth-token': token
                },
            });
            const blog = response.data;
            setBlogHeader(blog.blogHeader);
            setBlogBody(blog.blogBody);
        }catch (err){
            console.error(err);
            if(err.response.status === 401){
                localStorage.removeItem('jwtToken');
                navigate('/register')
            }
        }
    }

    const handleBlogHeader = (e) => {
        setBlogHeader(e.target.value);
    }

    const handleBlogBody = (e) => {
        setBlogBody(e.target.value);
    }

    const handlePostedDateChange = (date, dateString) => {
        setPostedDate(date);
    };

    const addBlog = async () => {
        const token = localStorage.getItem('jwtToken');
        setValidAlert(false);
        try{
            if(blogBody.length >= 10 && blogHeader.length >= 10){
                if(id){
                    await axios.put(`http://localhost:5000/api/blog/${id}`, {
                        blogHeader: blogHeader,
                        blogBody: blogBody,
                    },{
                        headers: {
                            'x-auth-token': token
                        },
                    });
                }else{
                    await axios.post('http://localhost:5000/api/blog', {
                        blogHeader: blogHeader,
                        blogBody: blogBody,
                        postedDate: postedDate !== null ? postedDate : new Date(),
                    },{
                        headers: {
                            'x-auth-token': token
                        },
                    });
                }
                navigate('/');
            }else{
                setValidAlert(true);
            }
        }catch (err){
            console.error(err);
            navigate('/');
        }
    }

    return(
        <div>
            <Navbar isAuth={true}/>
            <div className="form-container">
                {validAlert && (
                    <CustomAlert
                        description={"header and body should be at least 10 char long"}
                    />
                )}
                <p className="page-title">{ id ? 'Update blog' : 'Add new blog' }</p>
                <CustomInput title={'blog header'} id={'blogHeader'} inputValue={blogHeader} setValue={handleBlogHeader}
                    isTextArea={true}/>
                <CustomInput title={'blog body'} id={'blogBody'} inputValue={blogBody} setValue={handleBlogBody}
                             isTextArea={true}/>
                {!id && <DatePicker label="Posted date" onChange={handlePostedDateChange}/>}
                <Button type="primary" onClick={addBlog} className="form-button">
                    { id ? 'Update Blog' : 'Add Blog' }
                </Button>
            </div>
        </div>
    )
}

export default AddBlogScreen;