import { FaCheckCircle, FaTrash, FaHandPaper } from "react-icons/fa";
import { toast } from "react-toastify";
import '../styles/BoardList.css';

const Board = (props) => {
    function handleDelete(){
        props.onDelete(props.id);
        toast.error('Board Deleted Successfully');
    }

    function handleHold(){
        props.onHold(props.id);
    }

    function handleCheck(){
        props.onCheck(props.id);
    }

    return (
        <div className={`Board ${props.checked && "Checked-Board"} ${props.held && "Held-Board"}`} style={{height: props.expanded ? "200px" : "50px"}}>
            <h3 className="Board-title">{props.title}</h3>
            <div className="Board-content">
                <p>{props.content}</p>
                <div className="Board-btns">
                    <button onClick={handleDelete} className="board-btn trash-btn"> <FaTrash /> </button>
                    <button onClick={handleCheck} className={`board-btn ${props.checked && "board-check-btn"}`}> <FaCheckCircle className={`${props.checked && "board-checked"}`} /> </button>
                    <button onClick={handleHold} className={`board-btn ${props.held && "board-hold-btn"}`}>  <FaHandPaper className={`${props.held && "board-held"}`}/>  </button>
                </div>
            </div>
        </div>
    )
}

export default Board;
