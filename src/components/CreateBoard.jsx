import { useState } from 'react';
import { Box, IconButton, TextField, Snackbar, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const CreateBoard = (props) => {
    const [isValid, setIsValid] = useState(false);
    const [board, setBoard] = useState({
        title: "",
        content: ""
    });
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success", // success, warning, error, info
    });

    function validateForm() {
        setIsValid(board.title.trim() !== "" && board.content.trim() !== "");
    }

    function submitBoard(event) {
        event.preventDefault();

        if (!isValid) {
            setSnackbar({
                open: true,
                message: "Don't Waste Boards :)",
                severity: "warning",
            });
            return;
        }

        props.onAdd(board);
        setBoard({
            title: "",
            content: ""
        });
        setIsValid(false);
        setSnackbar({
            open: true,
            message: "Board Added Successfully",
            severity: "success",
        });
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setBoard((prevBoard) => ({
            ...prevBoard,
            [name]: value
        }));
    }

    function handleSnackbarClose() {
        setSnackbar({ ...snackbar, open: false });
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
                onBlur={validateForm}
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
                onBlur={validateForm}
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

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default CreateBoard;
