import Header from "../common/Header";
import "../../styles/Challenge.css";
import Button from "../common/Button";
import QuizSOLOPlay from "./QuizSOLOPlay";
import QuizMULTIPlay from "./QuizMULTIPlay";

const Challenge = () => {
    return (
        <div>
            <Header />
            <div className="challengeView">
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
                        <img src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA0MDRfMjY4%2FMDAxNjgwNjA5MzMwMDAw.uynRE6uOVblRXFZ3jJonlsvPh2qTFbnWfjyr8dt7XcEg.74h0oo0vlet4CsMp1oMmbAfr1mvI4MH6KU0Qww7PLrsg.PNG.asha316%2Fimage.png&type=sc960_832" className="img"></img>
                        
                        <div className="challengeExplainsection">
                            <div>
                                <h4 className="challengeExplain">챌린지~~~~<br />
                                    설명 ... <br />
                                    참여 가능 인원 수 : 1 ~ n 명   <br />
                                    플레이타임 : 10분</h4>
                            </div> 
                            <div> 
                                <section className="friendsPlus"></section>
                            </div>
                        </div>
                        
                    </div>
                    <div className="challengeStartBtn">
                        <Button type="button" className="challengeStart" text={"시작(솔로모드)"} link={"/ChallengeSOLOPlay"} />
                        <Button type="button" className="challengeStart2" text={"시작(멀티모드)"} link={"/ChallengeMULTIPlay"} />
                    </div>
                   
                </div>
            </div>
        </div>
    );
}

export default Challenge;