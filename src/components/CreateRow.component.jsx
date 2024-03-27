import React, { useState } from "react";
import '../css/CreateRow.component.css';

function CreateRow(props){

    const [isValid, setIsValid] = useState(false);

    const [row, setRow] = useState({
        title: "",
        content: "",
    });

    function validateForm(){
        setIsValid(row.title.trim() !== "" && row.title.trim() !== "");
    }

    function submitRow(event) {
       if(!isValid) {
            alert("Don't Waste Rows :)");
            event.preventDefault();
            return;
       }

       if(isValid) {
        props.onAdd(row);
        setRow({
            title: "",
            content: ""
        });
        setIsValid(false);
       }
       event.preventDefault();
    }

    function handleChange(event){
        const { name, value } = event.target;
        setRow((prevRow) => {
            return {
                ...prevRow,
                [name]: value
            };
        });
    }

    return( 
        <div>
            <form className="Tables-form-container">
                <div className="Tables-form-group">
                    <label htmlFor="title">Title: </label>
                    <input 
                        id="title"
                        name="title"
                        value={row.title}
                        onChange={handleChange}
                        onBlur={validateForm}
                        placeholder="Title"
                        className="Tables-form-control"
                        autoComplete="true"
                    />
                </div>

                <div className="Tables-form-group">
                    <label htmlFor="content">Content: </label>
                    <input 
                        id="content"
                        name="content"
                        value={row.content}
                        onChange={handleChange}
                        onBlur={validateForm}
                        placeholder="Type your Content!..."
                        className="Tables-form-control"
                        autoComplete="true"
                    />
                </div>

                <button className="Tables-submit-btn" onClick={submitRow}>
                    Add
                </button>

            </form>
        </div>
)};

export default CreateRow;