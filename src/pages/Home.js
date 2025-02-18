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
                    <h1> 환영합니다 </h1>
                    <p>Explore curated playlists, discover new artists, and expand your musical horizons.</p>
                    <a href="#" className="hero-button">Login</a>
                    <a href="#" className="hero-button">Login</a>
                {/* <PlaylistPage onClick={goPlaylistPage} />     */}
                </div>
            </div>
            {/* <ReadMoreList data={filteredData} />  이게 새로 만들기*/}
            <Button link={"/PlaylistPage"} 
                text={"내라이브러리로 가기"} />
        </div>
  
    );
}
export default Home;