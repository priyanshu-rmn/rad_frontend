import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import Applications from "./Applications";
import Positions from "./Positions";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import { Box } from "@mui/material";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [selected, setSelected] = useState<number>(0);
  const { isLoggedIn, login, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isLoggedIn);
    if (!isLoggedIn) {
      setTimeout(() => navigate("/login/"), 2000);
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      {!isLoggedIn && <p>redirecting to login...</p>}
      {isLoggedIn && (
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box
            sx={{
              height: "100vh",
              flex: "0 0 250px",
              display: { md: "flex", sm: "none", xs: "none" },
              backgroundColor: "white",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Sidebar setSelected={setSelected} selected={selected} />
          </Box>

          <Box
            sx={{
              height: "100vh",
              backgroundColor: "whitesmoke",
              overflow: "scroll",
            }}
          >
            <Grid size={12}>
              <Navbar setSelected={setSelected} selected={selected} />
            </Grid>
            <Grid size={12} sx={{ padding: "2rem" }}>
              {selected === 0 && <Dashboard />}
              {selected === 1 && <Applications />}
              {selected === 2 && <Positions />}
            </Grid>
          </Box>
        </Box>
      )}
    </>
  );
}
