import Header from "../common/Header";
import "../../styles/Quiz.css";

const Quiz = () =>{
    return(
<div>
<Header />

        <div className="quizView">
            
                <div className="friendsListTool">
                    <div className="friendsListToolsection">
                        <section className="tool">친구</section>
                    <div className="friendsListToolsection2">
                            <div className="friendsListToolSelectsection">
                            <section className="friendsName">홍길동</section>
                                <button type="button" className="friendsListsettingToolsection">정보</button>
                                <button type="button" className="friendsListsettingToolsection">삭제</button>
                            </div>
                        <div className="friendsListToolSelectsection">
                        <section className="friendsName">고양이</section>
                            <button type="button" className="friendsListsettingToolsection">정보</button>
                            <button type="button" className="friendsListsettingToolsection">삭제</button>
                        </div>
                        <div className="friendsListToolSelectsection">
                        <section className="friendsName">강아지</section>
                            <button type="button" className="friendsListsettingToolsection">정보</button>
                            <button type="button" className="friendsListsettingToolsection">삭제</button>
                        </div>
                        <div className="friendsListToolSelectsection">
                        <section className="friendsName">호랑이</section>
                            <button type="button" className="friendsListsettingToolsection">정보</button>
                            <button type="button" className="friendsListsettingToolsection">삭제</button>
                        </div>
                        <div className="friendsListToolSelectsection">
                        <section className="friendsName">고라니</section>
                            <button type="button" className="friendsListsettingToolsection">정보</button>
                            <button type="button" className="friendsListsettingToolsection">삭제</button>
                        </div>
                        <div>
                            <button type="button" className="next">next</button>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="playlistPygsong">
                    <div className="playlistPygsongtool">
                        <section className="playlistPygsongTitle">실행중인 플레이리스트</section>
                        <div className="playlistPygsongView">
                        </div>
                    </div>
                </div>

            

        
        
           
        <div className="MainBackground"> dsa</div>
    </div>
</div>


    );
}

export default Quiz;