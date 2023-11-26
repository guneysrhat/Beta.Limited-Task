// Library
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { useMediaQuery } from "@mui/material";
import { useEffect } from "react";
// Assets
import logo from "../assets/logo-dark.png";
import logoMini from "../assets/logoMini.jpg";

// Hooks
import useProductCalls from "../hooks/useProductCalls";
import useAuthCalls from "../hooks/useAuthCalls";

// Components
import ShoppingCartDropdown from "../components/ShoppingCartDropdown";

const drawerWidth = 200;

function Dashboard() {
  const { currentUser } = useSelector((state) => state.auth);
  const { logout } = useAuthCalls();
  const { getSearch } = useProductCalls();

  const [search, setSearch] = React.useState(" ");
  const isWideScreen = useMediaQuery("(min-width:900px)");

  console.log(search);
  useEffect(() => {
    getSearch();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = (e) => {
    e.preventDefault();
    getSearch(search);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `100%` },
          ml: { sm: `200px` },
          backgroundColor: "#ffffff",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isWideScreen ? (
              <img
                src={logo}
                alt="img"
                style={{ width: "100%", height: "40px" }}
              />
            ) : (
              <img
                src={logoMini}
                alt="img"
                style={{ width: "100%", height: "40px" }}
              />
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              "@media (max-width: 600px)": {
                display: "none",
              },
            }}
          >
            <Box
              sx={{
                border: "1px solid black",
                borderRadius: "20px",
                backgroundColor: "#ffffff", // Light Pink
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconButton sx={{ p: 1, color: "white" }} aria-label="search">
                <SearchIcon sx={{ color: "black" }} />
              </IconButton>
              <InputBase
                sx={{ ml: 1, color: "black", flexGrow: 1, mr: 21 }}
                placeholder="Searching for..."
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit(e);
                  }
                }}
              />
              <Button
                sx={{
                  p: 1,
                  ml: 1,
                  pl: 4,
                  pr: 4,
                  borderRadius: "0 20px 20px 0",
                  backgroundColor: "#C24B5A", // Light Pink
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                  color: "#ffffff", // White text color
                  "&:hover": {
                    backgroundColor: "#c24b5bac", // Light Pink
                  },
                }}
                onClick={handleSubmit}
              >
                Search
              </Button>
            </Box>
          </Box>
          <ShoppingCartDropdown />
          {currentUser && (
            <Button
              color="inherit"
              sx={{ color: "#C24B5A" }}
              onClick={() => logout()}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Container
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Container>
    </Box>
  );
}
export default Dashboard;
