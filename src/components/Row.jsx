import React, { useState, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { FaTrash, FaCheckCircle, FaHandPaper, FaSave, FaPlus } from "react-icons/fa";
import '../styles/TableList.css';
import '../styles/NoteList.css';

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
                <div className="row-btns">
                    <button onClick={() => onDelete(id)} className="row-btn row-delete-btn"><FaTrash /></button>
                    <button onClick={() => onCheck(id)} className={`row-btn ${checked ? "row-check-btn" : ""}`}><FaCheckCircle className={`${checked ? "row-checked" : ""}`} /></button>
                    <button onClick={() => onHold(id)} className={`row-btn ${held ? "row-hold-btn" : ""}`}><FaHandPaper className={`${held ? "row-held" : ""}`} /></button>
                    {isEditing ? (
                        <button onClick={handleSave} className="row-btn row-save-btn"><FaSave /></button>
                    ) : (
                        <button onClick={handleEdit} className="row-btn row-edit-btn"><FaPlus /></button>
                    )}
                </div>
            </td>
        </tr>
    );
}

export default Row;
