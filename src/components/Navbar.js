import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Button, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import '../styles/Navbar.css';

const Navbar = ({ isAuth }) => {
    const navigate = useNavigate();

    const navigateToUser = () => {
        navigate('/user');
    }

    return(
        <div>
            <div className={'header'}>
                <Row className={'header-items'}>
                    <Col span={2}>
                    </Col>
                    <Col span={16} >
                        <Link to={'/'}>
                            <h1 style={{color:'white'}} className={'title'}>Blogs</h1>
                        </Link>
                    </Col>
                    <Col span={5}>
                        {isAuth && <Link to={`/add`}>
                            <Button className={'add-blog-button'}>
                                Add Blog
                            </Button>
                        </Link>}
                    </Col>
                    <Col span={1}>
                        { isAuth && <Avatar size="large" onClick={navigateToUser} icon={<UserOutlined />} />}
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Navbar;