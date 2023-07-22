import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Modal } from "antd";
import moment from "moment";

import '../styles/SelectedBlogScreen.css';
import Navbar from "../components/Navbar";

const SelectedBlogScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState({});
    const [showModel, setShowModel] = useState(false);
    const [user, setUser] = useState({});
    const isAuthor = useMemo(() => {
        return blog.author === user._id;
    },[user, blog]);

    const fetchUser = async (token) => {
        const response = await axios.get(`http://localhost:5000/api/user`,{
            headers: {
                'x-auth-token': token
            },
        });
        setUser(response.data);
    }

    const fetchSelectedBlogs = async (token) => {
        const response = await axios.get(`http://localhost:5000/api/blog/${id}`,{
            headers: {
                'x-auth-token': token
            },
        });
        setBlog(response.data);
    }

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if(!token){
            navigate('/register')
        }else {
            fetchSelectedBlogs(token);
            fetchUser(token);
        }
    },[]);

    const clickEdit = () => {
        navigate(`/update/${id}`);
    }

    const clickDelete = () => {
        setShowModel(!showModel);
    }

    const deleteConfirm = async () => {
        const token = localStorage.getItem('jwtToken');
        try{
            await axios.delete(`http://localhost:5000/api/blog/${id}`, {
                headers: {
                    'x-auth-token': token
                }
            });
            navigate('/');
        }catch (err){
            console.error(err);
        }
    }

    return(
        <div>
            <Navbar isAuth={true}/>
            <Modal
                title="Are you sure about deleting Blog"
                visible={showModel}
                onOk={deleteConfirm}
                onCancel={clickDelete}
            >
                <p>are you sure about deleting this blog !!!</p>
            </Modal>
            <div className="blog-container">
                <div className="blog">
                    <h1 className="blog-title">{blog.blogHeader}</h1>
                    <div className="blog-info">
                        <span>Author: { blog.writtenBy }</span>
                        <br/>
                        <span className="blog-date">Published: { moment(blog.postedDate).format('MMMM D, YYYY') }</span>
                    </div>
                    <p className="blog-description">
                        { blog.blogBody }
                    </p>
                    {isAuthor && <div className="blog-actions">
                        <button className="blog-edit-btn" onClick={clickEdit}>Edit</button>
                        <button className="blog-delete-btn" onClick={clickDelete}>Delete</button>
                    </div> }
                </div>
            </div>
        </div>
    )
}

export default SelectedBlogScreen;