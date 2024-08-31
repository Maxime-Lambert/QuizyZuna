import { Box, Container, createTheme, ThemeProvider } from '@mui/material';
import { Outlet } from 'react-router-dom';
import PrincipalBackground from './assets/background.jpg';
import ButtonAppBar from './components/AppBar';
import Logo from './components/Logo';
import Copyright from './components/Copyright';

const MuiTheme = createTheme({
  palette: {
    primary: {
      main: '#283593',
    },
    secondary: {
      main: '#fbc02d',
    },
    error: {
      main: '#b71c1c'
    },
    success: {
      main: '#1b5e20'
    }
  },
  typography: {
    allVariants: {
      color: 'white'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background: 'primary.main',
          border: '1px solid',
          borderColor: '#fbc02d',
          fontSize: '100%',
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          background: '#283593',
          borderRadius: '8px'
        },
        icon: {
          fill: 'white'
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          background: '#283593',
          color: 'white',
          "&.Mui-selected": {
            background: '#283593'
          },
          '&:hover': {
            background: '#757de8 !important',
          },
        }
      }
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          "&.Mui-checked": {
            color: 'white'
          },
          color: 'white'
        }
      }
    },
    MuiInput: {
      styleOverrides: {
        root: {
          color: 'white',
          borderRadius: '8px'
        }
      }
    },
    MuiList: {
      styleOverrides: {
        root: {
          paddingTop: '0',
          paddingBottom: '0',
          display: 'flex',
          flexWrap: 'wrap'
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          border: '1px solid',
          borderColor: '#fbc02d',
          backgroundColor: '#283593'
        }
      }
    },
    MuiSlider: {
      styleOverrides: {
        thumb:{
          color: "white",
        },
        track: {
          color: '#fbc02d'
        },
        rail: {
          color: '#fbc02d'
        },
        markLabel: {
          color: "white"
        },
        valueLabel: {
          backgroundColor:'#283593'
        },
        mark: {
          color: 'white'
        }
      }
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          border: '1px solid',
          borderColor: '#fbc02d',
          borderRadius: '8px'
        }
      }
    }
  }
});

export default function App() {
  return (
    <ThemeProvider theme={MuiTheme}>
      <ButtonAppBar></ButtonAppBar>
      <Box id='background' 
            minWidth={'100vw'} 
            minHeight={'100vh'}
            sx={{ backgroundImage: `url(${PrincipalBackground})`, 
                  backgroundRepeat:'no-repeat',
                  backgroundSize:'cover',
                  backgroundPosition: 'center'}}>
        <Container maxWidth='xl'>
          <Logo />
          <Box mt={2} display={"flex"} justifyContent={"center"}>
            <Outlet/>
          </Box>
        </Container>
        <Copyright />
      </Box>
    </ThemeProvider>
  );
}
