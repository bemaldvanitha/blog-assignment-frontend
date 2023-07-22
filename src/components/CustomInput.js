import React from "react";
import {Input} from "antd";

import '../styles/CustomInput.css';

const { TextArea } = Input;

const CustomInput = ({ title, id, inputValue, setValue, isPassword = false, isTextArea = false }) => {
    if(isTextArea){
        return (
            <TextArea
                id={id}
                value={inputValue}
                onChange={setValue}
                className="cus-input"
                placeholder={`Enter your ${title}`}
                autoSize={{ minRows: 2, maxRows: 6 }} // Set the minRows and maxRows values as per your design requirements
            />
        )
    }

    return(
        <React.Fragment>
            {isPassword ? <Input.Password
                id={ id }
                value={inputValue}
                onChange={setValue}
                className="cus-input"
                placeholder={`enter your ${title}`}
            />  : <Input
                id={ id }
                value={inputValue}
                onChange={setValue}
                className="cus-input"
                placeholder={`enter your ${title}`}
            /> }
        </React.Fragment>
    )
}

export default CustomInput;