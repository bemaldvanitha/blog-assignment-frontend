import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import BlogItem from "../components/BlogItem";
import Navbar from "../components/Navbar";

import '../styles/AllBlogsScreen.css';

const AllBlogsScreen = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    const fetchBlogs = async (token) => {
        const response = await axios.get('http://localhost:5000/api/blog',{
            headers: {
                'x-auth-token': token
            },
        });
        setBlogs(response.data);
    }

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if(token === null){
            navigate('/register')
        }else{
            fetchBlogs(token);
        }
    },[]);

    return(
        <div>
            <Navbar isAuth={true}/>
            <div className={'blog-box'}>
                <div className={'blog-list'}>
                    {blogs.map(blog => <BlogItem key={blog._id} title={ blog.blogHeader } body={ blog.blogBody }
                                                 date={ blog.postedDate } id={blog._id} writtenBy={ blog.writtenBy }/>)}
                </div>
            </div>
        </div>
    )
}

export default AllBlogsScreen;