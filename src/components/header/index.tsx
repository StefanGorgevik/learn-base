import React, { useMemo } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import { Tab, Tabs } from "@mui/material";
import { useMainContext } from "../../contexts/MainContext";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export const Header: React.FC = () => {
  const { editing, setEditing, currentCollection, setCurrentCollection } =
    useMainContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const showBackButton = useMemo(() => {
    if (!pathname) {
      return false;
    } else {
      return (
        pathname.includes("/add") ||
        pathname.includes("/edit") ||
        pathname.includes("/view")
      );
    }
  }, [pathname]);

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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {showBackButton ? (
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
                  {editing ? `Editing` : "Add a new subject"}
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
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={currentCollection}
                    onChange={(currentTarget, target) => {
                      setCurrentCollection(target);
                    }}
                    textColor="inherit"
                    indicatorColor="secondary"
                    aria-label="secondary tabs example"
                  >
                    <Tab
                      value="javascript"
                      label="Javascript"
                      style={{ color: "#98a19d" }}
                    />
                    <Tab
                      value="react"
                      label="React"
                      style={{ color: "#98a19d" }}
                    />
                    <Tab
                      value="typescript"
                      label="Typescript"
                      style={{ color: "#98a19d" }}
                    />
                    <Tab
                      value="htmlcss"
                      label="HTML/CSS"
                      style={{ color: "#98a19d" }}
                    />
                  </Tabs>
                </Box>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>
                <IconButton
                  onClick={() => navigate("/add")}
                  sx={{ color: "white" }}
                >
                  <AddBoxIcon />
                </IconButton>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
