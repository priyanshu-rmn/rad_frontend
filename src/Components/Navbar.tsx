import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Sidebar from "./Sidebar";
import { Logout } from "@mui/icons-material";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";


export default function Navbar({
  selected,
  setSelected,
}: {
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    console.log(mobileOpen);
    setMobileOpen((prevState) => !prevState);
  };
  
  const navigate = useNavigate();
  const { logout } = useAuth();
  function handleLogout() {
    logout()
    navigate("/login/")
  } 

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Eightfold.ai
          </Typography>
          <Box>
            <IconButton
              color="inherit"
              aria-label="logout"
              edge="end"
              onClick={handleLogout}
              sx={{ mr: 2 }}
            >
              <Logout />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { sm: "block", md: "none", xs: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: "250px",
          },
        }}
      >
        <Box
          sx={{
            height: " 100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          onClick={handleDrawerToggle}
        >
          <Sidebar setSelected={setSelected} selected={selected} />
        </Box>
      </Drawer>
    </>
  );
}
