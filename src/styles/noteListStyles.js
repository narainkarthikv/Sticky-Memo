import theme from '../theme';

export const noteListStyles = {
  display: 'flex',
};

export const scrollBoxStyles = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  overflowY: 'auto',
  height: '500px',
  width: '80%',
  margin: '0 auto',
  padding: '0.5em',
  '&::-webkit-scrollbar': { width: '8px', backgroundColor: '#f1f1f1', borderRadius: '8px' },
  '&::-webkit-scrollbar-thumb': { backgroundColor: theme.palette.secondary.main, borderRadius: '8px', transition: 'background-color 0.3s ease-in-out' },
  '&::-webkit-scrollbar-thumb:hover': { backgroundColor: theme.palette.accent.main },
  '&::-webkit-scrollbar-track': { backgroundColor: '#f1f1f1', borderRadius: '8px' },
};
