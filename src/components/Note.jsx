import React from "react";
import { FaTrash } from "react-icons/fa";
import './note.css';


function Note(props){

    function handleClick(){
        props.onDelete(props.id);
    }

    return(
        <div className="note">
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <div>
                <button onClick={handleClick} className="trash" > <FaTrash/> </button>
            </div>
        </div>
    )
}

export default Note;