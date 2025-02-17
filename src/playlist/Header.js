import Button from "./Button";

const Header = () =>{

    return(
        <div className="header">
        <div>Musicovery</div>
        <Button text={"홈"} />
        <Button text={"소셜"} />
        <Button text={"게시판"} />
        </div>
    );
}

export default Header;