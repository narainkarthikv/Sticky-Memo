import React from "react";
import { FaCheckCircle, FaTrash, FaHandPaper } from "react-icons/fa";
import './note.css';


function Note(props) {

    function handleClick() {
        props.onDelete(props.id);
    }

    function handleCheck() {
        props.onCheck(props.id);
    }

    function handleHold(){
        props.onHold(props.id);
    }

    return (
        <div className={`note ${props.checked ? 'checked' : ''} ${props.held ? 'held' : ''}`}>
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <div>
                <button onClick={handleClick} className="trash"> <FaTrash /> </button>
                <button onClick={handleCheck} className="check"> <FaCheckCircle /> </button>
                <button onClick={handleHold} className="hold">  <FaHandPaper/> </button>
            </div>
        </div>
    )
}

export default Note;
