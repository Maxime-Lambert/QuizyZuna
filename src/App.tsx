import { Box, Container, createTheme, ThemeProvider, Typography, Link as RouterLink } from '@mui/material';
import { Outlet } from 'react-router-dom';
import logo from './assets/b.png';
import PrincipalBackground from './assets/principal_background.jpg';
import ButtonAppBar from './components/AppBar';
import { blue, yellow } from '@mui/material/colors';

const MuiTheme = createTheme({
  palette: {
    primary: {
      main: blue[900],
    },
    secondary: {
      main: yellow[700],
    },
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
          fontSize: '100%'
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          background: '#1a237e'
        },
        icon: {
          fill: 'white'
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          background: '#1a237e',
          input:  {
            color: 'white'
          }
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          background: '#1a237e',
          color: 'white'
        }
      }
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: 'white'
        }
      }
    },
    MuiInput: {
      styleOverrides: {
        root: {
          color: 'white'
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
          background: '#1a237e'
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
        }
      }
    }
  }
});

function Copyright() {
  return (
    <Typography mt={2} variant="body2" align="center">
      {'Copyright © '}
      <RouterLink color="inherit" href="https://mui.com/">
        QuizyZuna
      </RouterLink>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

export default function App() {

  return (
    <ThemeProvider theme={MuiTheme}>
      <ButtonAppBar></ButtonAppBar>
      <Box id='background' minWidth={'100vw'} minHeight={'100vh'} 
      sx={{ backgroundImage: `url(${PrincipalBackground})`, backgroundRepeat:'no-repeat', backgroundSize:'cover', backgroundPosition: 'center'}}>
        <Container maxWidth='xl'>
          <Box sx={{width:'40%', margin:'auto'}}>
              <Box  mt={2} 
                    component="img"
                    alt="QuizyZuna Logo"
                    src={logo}
                    />
          </Box>
          <Box mt={5} display={"flex"} justifyContent={"center"}>
            <Outlet/>
          </Box>
          </Container>
        <Copyright />
      </Box>
    </ThemeProvider>
  );
}
