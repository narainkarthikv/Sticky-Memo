import { useState } from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useRecoilState } from 'recoil';
import { snackbarState } from '../utils/state';

const CreateBoard = (props) => {
    const [board, setBoard] = useState({
        title: "",
        content: ""
    });
    const [snackbar, setSnackbar] = useRecoilState(snackbarState); // Use global snackbarState

    function submitBoard(event) {
        event.preventDefault();
      
        // Call addItem and check if it was successful
        const success = props.onAdd(board, setSnackbar, "Board");
        if (success) {
          setBoard({
            title: "",
            content: "",
          });
        }
      }
      

    function handleChange(event) {
        const { name, value } = event.target;
        setBoard((prevBoard) => ({
            ...prevBoard,
            [name]: value
        }));
    }

    return (
        <Box
            sx={{
                width: '250px',
                height: '120px',
                backgroundColor: 'white',
                padding: '1.3em',
                margin: '1.3em',
                borderRadius: '20px',
                border: '3px lightseagreen outset',
                boxShadow: 'solid 10 2px 5px #aaa;',
            }}
        >
            <TextField
                size="small"
                id="title"
                name="title"
                value={board.title}
                placeholder="Title"
                onChange={handleChange}
                autoComplete="true"
                fullWidth
                variant="standard"
            />
            <TextField
                size="small"
                id="content"
                name="content"
                value={board.content}
                placeholder="Type your Content !..."
                onChange={handleChange}
                autoComplete="true"
                multiline
                rows={4}
                fullWidth
                variant="standard"
            />
            <IconButton
                size="small"
                onClick={submitBoard}
                sx={{
                    right: '-85px',
                    bottom: '5px',
                    backgroundColor: '#FF6B6B',
                    fontSize: '1.3em',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '50%',
                    width: '2em',
                    height: '2em',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                    cursor: 'pointer',
                    outline: 'none',
                    transition: 'background-color 0.2s ease, transform 0.2s ease',
                    '&:hover': {
                        backgroundColor: '#FF4B4B',
                        transform: 'scale(1.1)',
                    },
                }}
            >
                <AddIcon />
            </IconButton>
        </Box>
    );
};

export default CreateBoard;
