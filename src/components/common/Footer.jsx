import React from 'react';
import { Box, Link, Typography, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import { footerStyles } from './styles';

// Footer component
const Footer = () => {
  return (
    <Box component="footer" sx={footerStyles.footer}>
      <Typography variant="body2" sx={footerStyles.inlineText}>
        &#169; 2024 Open-Source Project -
      </Typography>
      <IconButton
        href="https://www.github.com/narainkarthikv/Sticky-Memo"
        target="_blank"
        rel="noopener noreferrer"
        sx={footerStyles.iconButton}
      >
        <GitHubIcon />
      </IconButton>
      <Typography variant="body2" sx={{ ...footerStyles.inlineText, ml: 0.5 }}>
        Developed By
      </Typography>
      <IconButton
        href="https://www.github.com/narainkarthikv"
        target="_blank"
        rel="noopener noreferrer"
        sx={footerStyles.iconButton}
      >
        <DeveloperModeIcon />
      </IconButton>
      <Link
        href="https://www.github.com/narainkarthikv"
        target="_blank"
        rel="noopener noreferrer"
        sx={footerStyles.link}
      />
    </Box>
  );
}

export default Footer;
