import React from "react";
import { FaCheckCircle, FaTrash, FaHandPaper } from "react-icons/fa";
import '../css/Note.component.css';


function Note(props) {

    function handleDelete() {
        props.onDelete(props.id);
    }

    function handleCheck() {
        props.onCheck(props.id);
    }

    function handleHold(){
        props.onHold(props.id);
    }

    return (
        <div className={`note ${props.checked && "note-check"} ${props.held && "note-hold"}`}>
            <div className="note-container">
                <h1 className="note-title">{props.title}</h1>
                <p className="note-content">{props.content}</p> 
            </div>
            {props.all && (
                <div className="note-btns">
                    <button onClick={handleDelete} className={`note-btn note-delete-btn`}> <FaTrash /> </button>
                    <button onClick={handleCheck} className={`note-btn ${props.checked && "note-check-btn"}`}> <FaCheckCircle className={`${props.checked && "note-checked"}`} /> </button>
                    <button onClick={handleHold} className={`note-btn ${props.held && "note-hold-btn"}`}>  <FaHandPaper className={`${props.held && "note-held"}`}/> </button>
                </div>
            )}
        </div>
    )
}

export default Note;