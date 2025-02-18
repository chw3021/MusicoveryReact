import React from "react";
import "../../styles/Button.css";


const Button = ({text, type='default', onClick})=>{
    const btnType = ["insertType", "cancelType", "homeType", "socialType", "boardType"].includes(type) ? type : "default";

    return(
    <button className={["Button",`Button_${btnType}`].join(" ")}
     onClick={onClick}>{text}</button>
    );
};

export default Button;