import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const LoadingSpinner = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                bgcolor: "#f5f5f5", 
            }}
        >
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ mt: 2, color: "#666" }}>
                Loading, please wait...
            </Typography>
        </Box>
    );
};

export default LoadingSpinner;
