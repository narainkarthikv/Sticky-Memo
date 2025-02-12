import React, { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const CommonSort = ({ sortOrder, setSortOrder }) => {
  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <Tooltip title={`Sort by ${sortOrder === 'asc' ? 'descending' : 'ascending'} order`}>
      <IconButton onClick={toggleSortOrder}>
        {sortOrder === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default CommonSort;
