import React from "react";
import "./App.css";
import { Box } from "@mui/material";
import AppRoutes from "./config/index";

const App: React.FC = () => {
  return (
    <Box className="app-main">
      <AppRoutes />
    </Box>
  );
};

export default App;
