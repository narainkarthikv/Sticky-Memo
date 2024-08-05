import { useState } from "react";
import Note from "../components/Note.component";
import '../styles/NoteList.component.css';


const FilterNotes = (props) => {

    const [filter, setFilter] = useState("");

    const filteredNotes = props.notes.filter((noteItem) => {
        const conditionCheck = noteItem.title.toLowerCase().includes(filter.toLowerCase()) || noteItem.content.toLowerCase().includes(filter.toLowerCase());
        if(conditionCheck)
            return (noteItem.title.toLowerCase().includes(filter.toLowerCase() || noteItem.content.toLowerCase().includes(filter.toLowerCase())));
        return null;
    }).slice(0,1);

    return(
        <div>
            <input
                className="filter-input"
                placeholder="Filter Notes!..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
            <div className="filter-notes">
                {filteredNotes.map((noteItem,index) => (
                    <Note
                        key={index}
                        id={index}
                        title={noteItem.title}
                        content={noteItem.content}
                        checked={noteItem.checked}
                        held={noteItem.held}
                        all={noteItem.all}
                    />
                ))}
            </div>
        </div>
    )
}

export default FilterNotes;