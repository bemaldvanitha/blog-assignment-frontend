import React from 'react';
import { useNavigate } from "react-router-dom";
import { Card } from "antd";
import moment from "moment";

const BlogItem = ({ title, body, date, id, writtenBy }) => {
    const navigate = useNavigate();

    const navigateToPost = () => {
        navigate(`/${id}`);
    }

    return(
        <Card
            onClick={navigateToPost}
            bordered={false}
            style={{
                width: 600,
                textAlign: 'center',
                backgroundColor: '#F5F5F5',
                marginTop: 20,
            }}
        >
            <h2 style={{ fontSize: '24px' }}>{title}</h2>
            <p>{ body }</p>
            <p>{ moment(date).format('MMMM D, YYYY') }</p>
            <p>written by - { writtenBy }</p>
        </Card>

    )
}

export default BlogItem;