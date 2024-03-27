import { useState } from "react";
import Board from "./Board.component";
import CreateBoard from "./CreateBoard.component";
import '../css/BoardList.component.css';


const BoardList = () => {

    const [boards, setBoards] = useState([]);

    const addBoard = (newBoard) => {
        setBoards((prevBoards) => {
            return [...prevBoards, {...newBoard, held: false, checked: false}];
        })
    }

    function deleteboard(index){
        setBoards((prevBoards) => {
            return prevBoards.filter((boardItem, id) => { 
                return id !== index;
            });
        });
    }

    function checkBoard(index){
        setBoards((prevBoards) => {
            return prevBoards.map((boardItem, id) => {
                if(index === id) return { ...boardItem, checked: !boardItem.checked, held: false, all: true};
                return boardItem;
            });
        });
    }

    function holdBoard(index){
        setBoards((prevBoards) => {
            return prevBoards.map((boardItem, id) => {
                if(index === id) return {...boardItem, checked: false, held: !boardItem.held, all: true};
                return boardItem;
            });
        });
    }

    const heldBoards = boards.filter((boardItem) => {
        if(boardItem.held) return boardItem;
        return null;
    });

    const checkedBoards = boards.filter((boardItem) => {
        if(boardItem.checked) return boardItem;
        return null;
    });

    const allBoards = boards.map((boardItem) => { return {...boardItem, all: true} });

    return (
        <div className="BoardList">
            <div className="all-boards">
                <h4 className="BoardList-header">Boards</h4>
                {allBoards.map((boardItem, index) => (
                    <Board
                        key={index}
                        id={index}
                        title={boardItem.title}
                        content={boardItem.content}
                        onDelete={deleteboard}
                        onCheck={checkBoard}
                        onHold={holdBoard}
                        checked={boardItem.checked}
                        held={boardItem.held}
                        all={boardItem.all}
                    />
                ))}
                <CreateBoard onAdd={addBoard}/> 
            </div>
            <div className="held-boards">
                <h4 className="BoardList-header">Held Boards</h4>
                {heldBoards.map((boardItem, index) => (
                    <Board 
                        key={index}
                        id={index}
                        title={boardItem.title}
                        content={boardItem.content}
                        onDelete={deleteboard}
                        onCheck={checkBoard}
                        onHold={holdBoard}
                        checked={boardItem.checked}
                        held={boardItem.held}
                        all={boardItem.all}
                    />
                ))}
                
            </div>
            <div className="checked-boards">
                <h4 className="BoardList-header">Checked Boards</h4>
                {checkedBoards.map((boardItem, index) => (
                    <Board 
                        key={index}
                        id={index}
                        title={boardItem.title}
                        content={boardItem.content}
                        onDelete={deleteboard}
                        onCheck={checkBoard}
                        onHold={holdBoard}
                        checked={boardItem.checked}
                        held={boardItem.held}
                        all={boardItem.all}
                    />
                ))}
            </div>
        </div>
    )
}

export default BoardList;