import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Button.css";

const Button = ({ text, link, color }) => {

    return (
        <Link to={link}  className={`button ${color ? 'custom-color' : ''}`}>
            {text}
        </Link>
    );
};

export default Button;