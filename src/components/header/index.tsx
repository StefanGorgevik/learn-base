import React, { useMemo } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import { useEditing } from "../../contexts/MainContext";
import { SearchBar } from "../search";
import { TabsBar } from "./tabs";
import ListIcon from "@mui/icons-material/List";

export const Header: React.FC = () => {
  const { editing, setEditing } = useEditing();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const showAddButton = useMemo(() => {
    if (!pathname) {
      return false;
    } else {
      return pathname === "/";
    }
  }, [pathname]);

  const handleBackClick = () => {
    navigate(-1);
    if (editing && pathname.includes("edit")) {
      setEditing(false);
    }
  };

  const mainTitle = useMemo(
    () => (pathname === "/add" ? "Add a new subject" : "Add a Todo"),
    [pathname]
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {!showAddButton ? (
            <IconButton
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "1rem",
              }}
              onClick={handleBackClick}
            >
              <ArrowBackIcon sx={{ color: "white" }} />
              {!pathname.includes("view") && (
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  color="white"
                >
                  {editing ? `Editing` : mainTitle}
                </Typography>
              )}
            </IconButton>
          ) : (
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              data-testid="header-title"
            >
              LearnBase
            </Typography>
          )}
          <Box
            sx={{
              display: "flex",
              width: "70%",
              justifyContent: "space-between",
            }}
          >
            {showAddButton && (
              <>
                <TabsBar />
                <Box
                  style={{
                    display: "flex",
                    gap: "2rem",
                  }}
                >
                  <SearchBar />
                  <IconButton
                    onClick={() => navigate("/todos")}
                    sx={{ color: "white" }}
                  >
                    <ListIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => navigate("/add")}
                    sx={{ color: "white" }}
                  >
                    <AddBoxIcon />
                  </IconButton>
                </Box>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
