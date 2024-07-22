import { useEffect, useState } from "react";
import Board from "./Board.component";
import CreateBoard from "./CreateBoard.component";
import "../css/BoardList.component.css";

const BoardList = () => {
  const [boards, setBoards] = useState([]);
  const [filter, setFilter] = useState("");
  const [heldBoards, setHeldBoards] = useState([]);
  const [checkedBoards, setCheckedBoards] = useState([]);
  const [allBoards, setAllBoards] = useState([]);

  const addBoard = (newBoard) => {
    setBoards((prevBoards) => [
      ...prevBoards,
      { ...newBoard, held: false, checked: false },
    ]);
  };

  function deleteBoard(index) {
    setBoards((prevBoards) =>
      prevBoards.filter((_, id) => id !== index)
    );
  }

  function checkBoard(index) {
    setBoards((prevBoards) =>
      prevBoards.map((boardItem, id) =>
        index === id
          ? { ...boardItem, checked: !boardItem.checked, held: false, all: true }
          : boardItem
      )
    );
  }

  function holdBoard(index) {
    setBoards((prevBoards) =>
      prevBoards.map((boardItem, id) =>
        index === id
          ? { ...boardItem, checked: false, held: !boardItem.held, all: true }
          : boardItem
      )
    );
  }

  useEffect(() => {
    const filteredBoards = boards.filter((board) =>
      board.title.toLowerCase().includes(filter.toLowerCase()) ||
      board.content.toLowerCase().includes(filter.toLowerCase())
    );

    setAllBoards(filteredBoards.map((boardItem) => ({ ...boardItem, all: true })));
    setHeldBoards(filteredBoards.filter((boardItem) => boardItem.held));
    setCheckedBoards(filteredBoards.filter((boardItem) => boardItem.checked));
  }, [boards, filter]);

  return (
    <div className="BoardList">
      <input
        className="filter-input boards-filter"
        placeholder="Filter Boards!..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <div className="BoardListTable">
        <div className="all-boards">
          <h4 className="BoardList-header">Boards</h4>
          {allBoards.map((boardItem, index) => (
            <Board
              key={index}
              id={index}
              title={boardItem.title}
              content={boardItem.content}
              onDelete={deleteBoard}
              onCheck={checkBoard}
              onHold={holdBoard}
              checked={boardItem.checked}
              held={boardItem.held}
              all={boardItem.all}
            />
          ))}
          <CreateBoard onAdd={addBoard} />
        </div>
        <div className="held-boards">
          <h4 className="BoardList-header">Held Boards</h4>
          {heldBoards.map((boardItem, index) => (
            <Board
              key={index}
              id={index}
              title={boardItem.title}
              content={boardItem.content}
              onDelete={deleteBoard}
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
              onDelete={deleteBoard}
              onCheck={checkBoard}
              onHold={holdBoard}
              checked={boardItem.checked}
              held={boardItem.held}
              all={boardItem.all}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoardList;
