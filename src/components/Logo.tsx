import { Box } from "@mui/material";
import logo from '../assets/logo.png';

export default function Logo() {
  return(
    <Box display={'flex'} justifyContent={'center'}>
      <Box mt={8} 
            component="img"
            alt="QuizyZuna Logo"
            src={logo}
            sx={{height:260}}
            />
    </Box>
  );
};
