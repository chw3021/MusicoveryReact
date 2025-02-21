import Header from "../common/Header";

const ChallengeMULTIPlay = () => { 

    return (
        <div>
            <Header />
            <div className="background">
            <div className="header">
                <div className="playerment">
                    <section className="toplayer">잘하고 있습니다 ~ </section>
                </div>
                <div className="stopwatch">
                    <section className="stopwatch1">스탑워치</section>
                </div>
            </div>       
                <img src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA4MjNfMjky%2FMDAxNjYxMjYzMDc0MjUx.PaJs52r2LliUozpVJhc4YavuzgVepfQBc7V7AV_uN1og.pt0wMnhMZuHajTl0iVZO10Aro8SK8ycE8B63Cpw51gkg.JPEG.hs00222%2FIMG_0636.jpg&type=a340" className="img"></img>
            
            <div className="answer">
                <input type="text" placeholder="정답을 입력하세요" className="inputText"></input>
                <button className="click">제출하기!</button>
            </div>    
                <section className="answersView"></section>
            
            </div>
        </div>
        );
}
export default ChallengeMULTIPlay;  