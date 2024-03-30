import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

export const RootLayout = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ display: "flex", gap: 5 }}>
            <Link to="/">
              <Typography
                variant="h6"
                sx={{ flexGrow: 1, textDecoration: "none" }}
              >
                Home Page
              </Typography>
            </Link>
            <Link to="/history">
              <Typography
                variant="h6"
                sx={{ flexGrow: 1, textDecoration: "none" }}
              >
                History
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </>
  );
};
