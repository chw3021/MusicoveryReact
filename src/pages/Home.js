//홈화면

// import Edit from "./Edit";
import Button from "../components/common/Button";
import Header from "../components/common/Header";

import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
// import useReadMore from "../hooks/useReadMore.js";
// import useReadMore from "../hooks/"
// import PlaylistPage from "./PlaylistPage";

const Home = () =>{
    const navigate = useNavigate();

    // const onClickHere = () =>{
    //     navigate("/playlistPage");
    // }
   


    return ( 
        <div className="container">
            <Header />  
            {/* 뮤직커버리, 홈 소셜 게시판 -> header  */}

            <section className="section_midnight"></section>
            <div className="hero">
                <div className="hero-content">
                    <h1>Heading</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit,</p>
                    <p> sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <a href="#" className="hero-button1">로그인</a>
                    <a href="#" className="hero-button2">회원가입</a>
                {/* <PlaylistPage onClick={goPlaylistPage} />     */}
                </div>
            </div>
            {/* <ReadMoreList data={filteredData} />  이게 새로 만들기*/}
            <Button link={"/PlaylistPage"} 
                text={"내라이브러리로 가기화면보려고만든거예여삭제하면안대여!!!"} />
        </div>
  
    );
}
export default Home;