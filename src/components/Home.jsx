import { Link } from "react-router-dom";
import figureGif from "../assets/todo_image.gif"

function Home(){
    return(
        <div className="justtify-content-center text-center mt-3">
        <h1 className="fw-bold">안녕💙</h1>
        <hr/>
        <figure>
            <blockquote className="blockquote">
                <p className="h6 fw-bold">
                    꿈은 날짜와 함께 적어놓으면, 그것은 목표가 되고, 목표를 잘게 나누면,<br/>
                    그것은 계획이 되며, 그 계획을 실행에 옮기면 꿈은 실현 되는 것이다.
                </p>
            </blockquote>
            <figcaption className="blockquote-footer">
                <cite title="Source Title" className="h6 fw-bold">
                Greg S. Reid
                </cite>
            </figcaption>
        </figure>
        <img src={figureGif} alt="main" />
        <h5>나를 찾는 여행</h5>
        <hr/>
        <Link to="/todo" className="link-success h5 fw-bold">📝일정 작성하러 이동하기📝</Link>
        </div>
    )
}
export default Home;