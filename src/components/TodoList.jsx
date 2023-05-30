import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function TodoList() {
    const [todo, setTodo] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    function getTodos() {
        axios.get("http://localhost:4000/todos").then((res) => {
            setTodoList(res.data)
        }).catch((error) => {
            setErrorMessage("Json-Server 켰는지 확인했니!")
        })
    }

    useEffect(() => {
        getTodos();
    }, []); // 의존성 배열로 비워두면 처음에만 렌더링 된다.

    function onsubmit() {
        axios.post("http://localhost:4000/todos/", {
            content: todo
        }).then((res) => {
            toast.success("일정 등록 완료!");
            setTodoList(prevTodo => {return [...prevTodo, res.data]})
            // window.location.reload();
        })
    }

    function onDelete(id) {
        axios.delete("http://localhost:4000/todos/" + id).then(() => {
            window.location.reload(); //삭제했을 때 페이지를 한 번 load 시키겠다.
        })
    }

    function handleCheck(event, id, content) {
        axios.put("http://localhost:4000/todos/" + id, {
            checked: event.target.checked,
            content: content
        }).then(() => {
            window.location.reload();
        })
    }

    return (
        <div>
            <h4 className="text-center">일정 관리</h4>
            <hr />
            <div className="d-flex justity-content-between">
                <div className="flex-fill">
                    <input
                        onChange={(event) => setTodo(event.target.value)}
                        value={todo}
                        className="form-control"
                        placeholder="어떤 일정이 있나요?" />
                </div>
                <button onClick={onsubmit} className="btn btn-primary ms-3">등록</button>
            </div>
            <hr />
            {errorMessage ? <div className="text-danger">{errorMessage}</div> : ""}
            <div>
                {todoList.map((item, index) => {
                    return (
                        <div className="card mt-2" key={index}>
                            <div className="card-body d-flex justify-content-between align-itmes-center">
                                <div className="flex-fill">
                                    <input
                                        checked={item.checked} // true, false의 값을 가짐
                                        onChange={(event) => handleCheck(event, item.id, item.content)}
                                        className="form-check-input me-2"
                                        type="checkbox" />
                                    <span style={{
                                        textDecoration: item.checked ? "line-through" : "",
                                        color: item.checked ? "gray" : "black"
                                    }}>
                                        {item.content}</span>
                                </div>
                                <div className="d-flex">
                                    <Link
                                        to={"/todo/modify/" + item.id}
                                        state={{
                                            id: item.id,
                                            content: item.content,
                                            checked: item.checked
                                        }}
                                        style={{ width: "60px" }}
                                        className="btn btn-success me-2">
                                        수정
                                    </Link>
                                    <button
                                        style={{ width: "60px" }}
                                        onClick={() => { onDelete(item.id) }}
                                        className="btn btn-danger">삭제</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default TodoList;