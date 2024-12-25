import theme from '../../theme';

export const footerStyles = {
  footer: {
    width: '100%',
    textAlign: 'center',
    padding: theme.spacing(1),
    position: 'fixed',
    bottom: 0,
    left: 0,
    fontSize: '0.9em',
    backgroundColor: theme.palette.primary.main,
  },
  inlineText: {
    display: 'inline',
  },
  link: {
    color: theme.palette.secondary.main,
    textDecoration: 'none',
    fontWeight: 'bold',
    marginLeft: '5px',
    transition: 'color 0.3s ease',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  iconButton: {
    color: 'black',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  }
};

export const navbarStyles = {
  iconButton: {
    width: "3rem",
    height: "3rem",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
    color: "black",
    "&:hover": {
      width: "6rem",
      borderRadius: "20px",
      backgroundColor: "white",
    },
  },
  link: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "inherit",
  },
  label: {
    ml: 0.5,
    display: "none",
    transition: "display 0.3s ease",
    "&.MuiIconButton-hovered &": {
      display: "inline",
    },
    color: "black",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.5rem 1rem",
    backgroundColor: theme.palette.primary.main,
  },
  navItems: {
    display: "flex",
    gap: "10px",
  },
};

