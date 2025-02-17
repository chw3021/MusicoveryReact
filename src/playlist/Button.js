


const Button = ({text, type='default', onClick})=>{
    const btnType = ["insertType", "cancelType"].includes(type) ? type : "default";

    return(
    <button className={["Button",`Button_${btnType}`].join(" ")}
     onClick={onClick}>{text}</button>
    );
};

export default Button;