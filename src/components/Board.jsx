import { FaCheckCircle, FaTrash, FaHandPaper } from "react-icons/fa";
import { toast } from "react-toastify";
import '../styles/Button.css';

const Board = (props) => {
    function handleDelete() {
        props.onDelete(props.id);
        toast.error('Board Deleted Successfully');
    }

    function handleHold() {
        props.onHold(props.id);
    }

    function handleCheck() {
        props.onCheck(props.id);
    }

    return (
        <div className={`Board ${props.checked && "Checked-Board"} ${props.held && "Held-Board"}`} style={{height: props.expanded ? "200px" : "50px"}}>
            <h3 className="Board-title">{props.title}</h3>
            <div className="Board-content">
                <p>{props.content}</p>
                {props.all && (
                    <div className="Board-btns">
                        <button onClick={handleDelete} className="Item-btn Item-delete-btn"><FaTrash /></button>
                        <button onClick={handleCheck} className="Item-btn Item-checked-btn"><FaCheckCircle /></button>
                        <button onClick={handleHold} className="Item-btn Item-held-btn"><FaHandPaper /></button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Board;
