import Header from "../common/Header";
import "../../styles/Quiz.css";
import Button from "../common/Button";
import QuizSOLOPlay from "./QuizSOLOPlay";
import QuizMULTIPlay from "./QuizMULTIPlay";

const Quiz = () => {
    return (
        <div>
            <Header />
            <div className="quizView">
                <div>
                    <div className="friendsListTool">
                        <div className="friendsListToolsection">
                            <section className="tool">친구</section>
                            <div className="friendsListToolsection2">
                                <div className="friendsListToolSelectsection">
                                    <section className="friendsName">홍길동</section>
                                    <button type="button" className="friendsListsettingToolsection">추가</button>
                                    <button type="button" className="friendsListsettingToolsection">삭제</button>
                                </div>
                                <div className="friendsListToolSelectsection">
                                    <section className="friendsName">고양이</section>
                                    <button type="button" className="friendsListsettingToolsection">추가</button>
                                    <button type="button" className="friendsListsettingToolsection">삭제</button>
                                </div>
                                <div className="friendsListToolSelectsection">
                                    <section className="friendsName">강아지</section>
                                    <button type="button" className="friendsListsettingToolsection">추가</button>
                                    <button type="button" className="friendsListsettingToolsection">삭제</button>
                                </div>
                                <div className="friendsListToolSelectsection">
                                    <section className="friendsName">호랑이</section>
                                    <button type="button" className="friendsListsettingToolsection">추가</button>
                                    <button type="button" className="friendsListsettingToolsection">삭제</button>
                                </div>
                                <div className="friendsListToolSelectsection">
                                    <section className="friendsName">고라니</section>
                                    <button type="button" className="friendsListsettingToolsection">추가</button>
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
                </div>
                <div className="MainBackground">
                    <div>
                        <img src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA5MjRfOSAg%2FMDAxNzI3MTY3MjUxODA5.6Nvvr1j2TiEjhaQ8OS9iwGxjjwNGn2pPZyV-NQnx0WAg.I-Pq44URMdviIg4xG_9sD-tTRwuGKqJMdz3ppYbBx4Yg.PNG%2F%25C1%25A4%25BA%25B8%25B2%25C4%25B2%25C4%25C8%25F7.png&type=sc960_832" className="img"></img>
                        
                        <div className="quizExplainsection">
                            <div>
                                <h4 className="quizExplain">랜덤 ! 노래 맞추기 !!<br />
                                    설명 ... <br />
                                    참여 가능 인원 수 : 1 ~ n 명   <br />
                                    플레이타임 : 10분</h4>
                            </div> 
                            <div> 
                                <section className="friendsPlus"></section>
                            </div>
                        </div>
                        
                    </div>
                    <div className="quizStartBtn">
                        <Button type="button" className="quizStart" text={"시작(솔로모드)"} link={"/QuizSOLOPlay"} />
                        <Button type="button" className="quizStart2" text={"시작(멀티모드)"} link={"/QuizMULTIPlay"} />
                    </div>
                   
                </div>
            </div>
        </div>
    );
}

export default Quiz;