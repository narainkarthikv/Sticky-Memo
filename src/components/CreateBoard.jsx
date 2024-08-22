import { useState } from 'react';
import { toast } from 'react-toastify';
import '../styles/BoardList.css';

const CreateBoard = (props) => {
    const [isValid, setIsValid] = useState(false);

    function validateForm(){
        setIsValid(board.title.trim() !== "" && board.content.trim() !== "");
    }

    const [board, setBoard] = useState({
        title: "",
        content: ""
    });

    function submitBoard(event){
        if(!isValid){
            toast.warn("Don't Waste Boards :)");
            event.preventDefault();
            return;
        }
        if(isValid){
            props.onAdd(board);
            setBoard({
                title: "",
                content: ""
            });
            setIsValid(false);
            toast.success('Board Added Successfully');
        }
        event.preventDefault();
    }

    function handleChange(event){
        const {name, value} = event.target;
        setBoard((prevBoard) => {
            return {
                ...prevBoard,
                [name]: value
            };
        });
    }

    return(
        <div className="CreateBoard"> 
            <input 
                id="title"
                name="title"
                value={board.title}
                placeholder="Title"
                onBlur={validateForm}
                onChange={handleChange}
                autoComplete="true"
                className="CreateBoard-title"
            />
            <textarea 
                id="content"
                name="content"
                value={board.content}
                placeholder="Type your Content !..."
                onBlur={validateForm}
                onChange={handleChange}
                autoComplete="true"
                className="CreateBoard-content"
            />
            <button className="CreateNote-btn" onClick={submitBoard}>
                +
            </button>
        </div>
    );
}

export default CreateBoard;
