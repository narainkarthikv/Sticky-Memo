import React, { useState, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { toast } from "react-toastify";
import { FaTrash, FaCheckCircle, FaHandPaper, FaSave, FaPlus } from "react-icons/fa";
import '../styles/TableList.css';
import '../styles/NoteList.css';
import '../styles/Button.css';

const ItemType = 'ROW';

function Row({ id, index, title, content, onDelete, onCheck, onHold, onSave, checked, held, moveRow }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedContent, setEditedContent] = useState(content);

    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: ItemType,
        hover(item) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            moveRow(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: ItemType,
        item: { type: ItemType, id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        onSave(id, editedTitle, editedContent);
        setIsEditing(false);
    };

    const handleChangeTitle = (event) => {
        setEditedTitle(event.target.value);
    };

    const handleChangeContent = (event) => {
        setEditedContent(event.target.value);
    };

    function handleDelete(){
        onDelete(id);
        toast.error('Row Deleted Successfully');
    }

    function handleHold(){
        onHold(id);
    }

    function handleCheck(){
        onCheck(id);
    }

    return (
        <tr
            ref={ref}
            className={`row ${checked ? "row-check" : ""} ${held ? "row-hold" : ""}`}
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            <td className="row-data">
                {isEditing ? (
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={handleChangeTitle}
                        className="row-edit-title"
                    />
                ) : (
                    title
                )}
            </td>
            <td className="row-data">
                {isEditing ? (
                    <textarea
                        value={editedContent}
                        onChange={handleChangeContent}
                        className="row-edit-content"
                    />
                ) : (
                    content
                )}
            </td>
            <td className="row-data">
                <div className="Item-btns">
                    <button onClick={handleDelete} className="Item-btn Item-delete-btn"><FaTrash /></button>
                    <button onClick={handleCheck} className="Item-btn Item-checked-btn"><FaCheckCircle /></button>
                    <button onClick={handleHold} className="Item-btn Item-held-btn"><FaHandPaper /></button>
                    {isEditing ? (
                        <button onClick={handleSave} className="Item-btn Item-save-btn"><FaSave /></button>
                    ) : (
                        <button onClick={handleEdit} className="Item-btn Item-edit-btn"><FaPlus /></button>
                    )}
                </div>
            </td>
        </tr>
    );
}

export default Row;
