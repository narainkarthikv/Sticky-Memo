import { FaTrash, FaCheckCircle, FaHandPaper } from "react-icons/fa";
import '../css/Row.component.css';
import '../css/Note.component.css';

function Row(props){

    function handleDelete() {
        props.onDelete(props.id);
    }

    function handleCheck(){
        props.onCheck(props.id);
    }

    function handleHold(){
        props.onHold(props.id);
    }

    return(
        <tr className={`row ${props.checked && "row-check"} ${props.held && "row-hold"}`}>
            <td className="row-data">{props.title}</td>
            <td className="row-data">{props.content}</td>
            <td className="row-data">
                <div className="row-btns">
                    <button onClick={handleDelete} className="row-btn row-delete-btn" > <FaTrash /> </button>
                    <button onClick={handleCheck} className={`row-btn ${props.checked && "row-check-btn"}`}> <FaCheckCircle className={`${props.checked && "row-checked"}`} /> </button>
                    <button onClick={handleHold} className={`row-btn ${props.held && "row-hold-btn"}`}>  <FaHandPaper className={`${props.held && "row-held"}`}/> </button>
                </div>
            </td>              
        </tr>
)};

export default Row;