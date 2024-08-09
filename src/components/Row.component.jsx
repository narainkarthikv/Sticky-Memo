import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { FaTrash, FaCheckCircle, FaHandPaper } from "react-icons/fa";
import '../styles/TableList.component.css';
import '../styles/NoteList.component.css';

const ItemType = 'ROW';

function Row({ id, index, title, content, onDelete, onCheck, onHold, checked, held, moveRow }) {

    const ref = React.useRef(null);

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

    return (
        <tr
            ref={ref}
            className={`row ${checked ? "row-check" : ""} ${held ? "row-hold" : ""}`}
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            <td className="row-data">{title}</td>
            <td className="row-data">{content}</td>
            <td className="row-data">
                <div className="row-btns">
                    <button onClick={() => onDelete(id)} className="row-btn row-delete-btn"><FaTrash /></button>
                    <button onClick={() => onCheck(id)} className={`row-btn ${checked ? "row-check-btn" : ""}`}><FaCheckCircle className={`${checked ? "row-checked" : ""}`} /></button>
                    <button onClick={() => onHold(id)} className={`row-btn ${held ? "row-hold-btn" : ""}`}><FaHandPaper className={`${held ? "row-held" : ""}`} /></button>
                </div>
            </td>
        </tr>
    );
}

export default Row;
