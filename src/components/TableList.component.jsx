import React, { useState } from "react";
import CreateRow from "./CreateRow.component";
import Row from "./Row.component";
import '../css/TableList.component.css';

const TableList = () => {

    const [rows, setRows] = useState([]);

    const addRow = (newRow) => {
        setRows((prevRows) => {
            return [...prevRows, {...newRow, checked: false, held: false}];
        })
    }

    function checkRow(id){
        setRows((prevRows) => {
            return prevRows.map((rowItem, index) => {
                if(id === index)
                    return { ...rowItem, checked: !rowItem.checked, held: false};
                return rowItem;
            });
        });
    }

    function holdRow(id){
        setRows((prevRows) => {
            return prevRows.map((rowItem, index) => {
                if(id === index)
                    return {...rowItem, checked: false, held: !rowItem.held };
                return rowItem;
            })
        })
    }

    const deleteRow = (id) => {
        setRows((prevRows) => {
            return prevRows.filter((rowItem, index) => {
                return index !== id;
            });
        });
    }

    const allRows = rows.map((rowItem) => ({...rowItem, all: true}));

    return(
        <div className="TableList">
            <table className="table-container">
                <thead>
                    <tr>
                        <th className="table-head">Title</th>
                        <th className="table-head">Content</th>
                        <th className="table-head">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allRows.map((rowItem, index) => (
                        <Row
                            key={index}
                            id={index}
                            title={rowItem.title}
                            content={rowItem.content}
                            onDelete={deleteRow}
                            onCheck={checkRow}
                            onHold={holdRow}
                            checked={rowItem.checked}
                            held={rowItem.held}
                            all={rowItem.all}
                        />
                    ))}
                </tbody>
            </table>
            <CreateRow onAdd={addRow}/>
        </div>
    )
};

export default TableList;