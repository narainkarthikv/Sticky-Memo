import React from "react";
import { FaCheckCircle, FaTrash, FaHandPaper } from "react-icons/fa";
import '../css/Note.component.css';


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
        <div className={`note ${props.checked && "check"} ${props.held && "hold"}`}>
            {props.checked && <h2 className="note-pin">📍</h2>}
            <div className="note-container">
                <h1 className="note-title">{props.title}</h1>
                <p className="note-content">{props.content}</p> 
            </div>
            {props.all && (
                <div className="note-btns">
                    <button onClick={handleClick} className="delete-btn"> <FaTrash /> </button>
                    <button onClick={handleCheck} className={`${props.checked && "check-btn"}`}> <FaCheckCircle className={`${props.checked && "checked"}`} /> </button>
                    <button onClick={handleHold} className={`${props.held && "hold-btn"}`}>  <FaHandPaper className={`${props.held && "held"}`}/> </button>
                </div>
            )}
        </div>
    )
}

export default Note;