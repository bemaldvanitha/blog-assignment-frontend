import React from "react";
import {Alert} from "antd";

import '../styles/CustomAlert.css';

const CustomAlert = ({description, message = ''}) => {
    return(
        <Alert
            className="cus-alert"
            message={ message.length > 0 ? message :"Error" }
            description={ description }
            type="error"
            showIcon
            closable
        />
    )
}

export default CustomAlert;