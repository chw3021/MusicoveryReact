import Button from "./Button";
<link rel="https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap"></link>


const Header = () =>{

    return(
        <div className="header">
        <div id="forFont">Musicovery</div>
        <Button text={"홈"} />
        <Button text={"소셜"} />
        <Button text={"게시판"} />
        </div>
    );
}

export default Header;