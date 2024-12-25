import { useState } from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useRecoilState } from 'recoil';
import { snackbarState } from '../../utils/state';
import { boxStyles, iconButtonStyles } from './styles';

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
        <Box sx={boxStyles}>
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
                sx={iconButtonStyles}
            >
                <AddIcon />
            </IconButton>
        </Box>
    );
};

export default CreateBoard;
