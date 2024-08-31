import { Link, Typography } from "@mui/material";

export default function Copyright() {
  return (
    <Typography mt={2} variant="body2" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        QuizyZuna
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
};
