import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2C3639', // Dark charcoal
      light: '#3F4E4F', // Lighter charcoal
      dark: '#1F2937', // Darker charcoal
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#A27B5C', // Warm brown
      light: '#DCD7C9', // Light beige
      dark: '#8B593C', // Dark brown
      contrastText: '#ffffff',
    },
    background: {
      default: '#F8F9FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C3639',
      secondary: '#3F4E4F',
    },
    error: {
      main: '#CF6679',
    },
    success: {
      main: '#4A6741', // Muted green
    },
    info: {
      main: '#2C3639',
    },
    warning: {
      main: '#CD853F', // Peru brown
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
      letterSpacing: '-0.025em',
      color: '#2C3639',
    },
    h2: {
      fontWeight: 600,
      letterSpacing: '-0.025em',
      color: '#2C3639',
    },
    h3: {
      fontWeight: 600,
      letterSpacing: '-0.025em',
      color: '#2C3639',
    },
    h4: {
      fontWeight: 600,
      letterSpacing: '-0.025em',
      color: '#2C3639',
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '-0.025em',
      color: '#2C3639',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '-0.025em',
      color: '#2C3639',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '10px 24px',
          boxShadow: 'none',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          },
        },
        contained: {
          background: 'linear-gradient(45deg, #2C3639 30%, #3F4E4F 90%)',
          color: '#ffffff !important',
          '&:hover': {
            background: 'linear-gradient(45deg, #1F2937 30%, #2C3639 90%)',
          },
          '& .MuiTypography-root': {
            color: '#ffffff !important',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(45deg, #A27B5C 30%, #8B593C 90%)',
          color: '#ffffff !important',
          '&:hover': {
            background: 'linear-gradient(45deg, #8B593C 30%, #A27B5C 90%)',
          },
          '& .MuiTypography-root': {
            color: '#ffffff !important',
          },
        },
        outlined: {
          borderColor: '#2C3639',
          color: '#2C3639',
          '&:hover': {
            borderColor: '#1F2937',
            backgroundColor: 'rgba(44, 54, 57, 0.04)',
          },
        },
        text: {
          color: '#2C3639',
          '&:hover': {
            backgroundColor: 'rgba(44, 54, 57, 0.04)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#2C3639',
          color: '#ffffff',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          '& .MuiButton-root': {
            color: '#ffffff !important',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
            },
          },
          '& .MuiIconButton-root': {
            color: '#ffffff !important',
          },
          '& .MuiTypography-root': {
            color: '#ffffff !important',
          },
          '& .MuiButtonBase-root': {
            color: '#ffffff !important',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#E0E3E7',
              transition: 'all 0.3s ease',
            },
            '&:hover fieldset': {
              borderColor: '#A27B5C',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#2C3639',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#E0E3E7',
            transition: 'all 0.3s ease',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#A27B5C',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#2C3639',
          },
        },
      },
    },
    MuiRating: {
      styleOverrides: {
        root: {
          color: '#A27B5C',
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          background: 'linear-gradient(45deg, #A27B5C 30%, #8B593C 90%)',
          transition: 'all 0.3s ease',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: '#F8F9FA',
          borderColor: '#E0E3E7',
          '&:hover': {
            backgroundColor: '#DCD7C9',
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#2C3639',
          transition: 'all 0.3s ease',
          '&:hover': {
            color: '#A27B5C',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: 'rgba(162, 123, 92, 0.08)',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: 'rgba(162, 123, 92, 0.08)',
          },
        },
      },
    },
  },
});

export default theme; 