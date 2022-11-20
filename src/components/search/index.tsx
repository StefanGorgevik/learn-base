import React, { useState } from "react";
import { styled, alpha, useTheme } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchPosts } from "../../queries/useSearchPosts";
import { useCurrentCollection } from "../../contexts/MainContext";
import { isEmpty } from "lodash-es";
import { IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
  display: "flex",
  alignItems: "center",
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
      width: "22ch",
    },
  },
}));

const SearchItems = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 50,
  right: 1,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#354259",
  minWidth: "25ch",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 5,
}));

export const SearchBar: React.FC = () => {
  const theme = useTheme();
  const [search, setSearch] = useState<string>("");
  const [isClicked, setIsClicked] = useState(false);
  const { data } = useSearchPosts(search);
  const { currentCollection } = useCurrentCollection();
  const navigate = useNavigate();

  const handleSelectPost = (postId: string) => {
    navigate(`/view/${postId}`);
  };

  return isClicked ? (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder={`Search in ${currentCollection}`}
        inputProps={{ "aria-label": "search" }}
        onChange={(e) => {
          setSearch(e.target.value as string);
        }}
      />
      <SearchItems>
        {!isEmpty(data) &&
          data?.map((item: any) => (
            <Typography
              id="searches"
              key={item.id}
              style={{
                padding: "0.5rem",
                paddingLeft: 20,
                cursor: "pointer",
                width: "100%",
                borderBottom: `1px solid ${theme?.palette.primary.contrastText}`,
              }}
              onClick={() => {
                handleSelectPost(item.id);
                setIsClicked(false);
              }}
            >
              {item.title}
            </Typography>
          ))}
      </SearchItems>
    </Search>
  ) : (
    <IconButton onClick={() => setIsClicked(true)} sx={{ color: "white" }}>
      <SearchIcon />
    </IconButton>
  );
};
