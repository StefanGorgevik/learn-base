import { createTheme, ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import { AddSubjectModal } from "./components/addSubjectModal";
import { Header } from "./components/header";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
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
  const [modalOpened, setModalOpened] = useState(true);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Header handleOpenModal={() => setModalOpened(true)} />
          <AddSubjectModal
            open={modalOpened}
            handleClose={() => setModalOpened(false)}
          />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
