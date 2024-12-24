import React from 'react';
import { TextField } from '@mui/material';

const CommonFilter = ({ filter, setFilter }) => (
  <TextField
    sx={{ margin: '1.3em' }}
    onChange={(e) => setFilter(e.target.value)}
    value={filter}
    placeholder="Filter items!..."
    variant="standard"
  />
);

export default CommonFilter;
