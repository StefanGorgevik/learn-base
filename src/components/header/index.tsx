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

export const Header: React.FC<{
  editing: boolean;
  setEditing: (editing: boolean) => void;
}> = ({ editing, setEditing }) => {
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
              width: "50%",
              justifyContent: "space-between",
            }}
          >
            {showAddButton && (
              <>
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
