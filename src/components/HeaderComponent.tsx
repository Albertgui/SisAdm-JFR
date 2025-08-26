import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";

export default function HeaderComponent() {
  return (
    <Box sx={{ flexGrow: 1, mb: 4 }} >
      <AppBar position="static">
        <Toolbar sx={{backgroundColor: "rgb(211, 47, 47)"}}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} fontWeight={600}>
            Auditorías JFR
          </Typography>
          <IconButton
            aria-label="logout"
            sx={{
              color: "#ffffffff",
            }}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
