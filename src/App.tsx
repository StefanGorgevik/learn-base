import { createTheme, ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import { AddSubjectModal } from "./components/addSubjectModal";
import { Header } from "./components/header";
import { QueryClient, QueryClientProvider } from "react-query";
import { Posts } from "./components/posts";
const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: {
      main: "#354259",
      light: "#C2DED1",
      dark: "#4C0027",
    },
  },
});

function App() {
  const [modalSettings, setModalSettings] = useState({
    opened: false,
    edit: false,
    id: "",
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Header
            handleOpenModal={() =>
              setModalSettings({ opened: true, edit: false, id: "" })
            }
          />
          <AddSubjectModal
            modalSettings={modalSettings}
            open={modalSettings.opened}
            handleClose={() =>
              setModalSettings({ opened: false, edit: false, id: "" })
            }
          />
          <Posts setModalSettings={setModalSettings} />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
