import {
  Alert,
  createTheme,
  IconButton,
  Snackbar,
  ThemeProvider,
} from "@mui/material";
import { AddSubjectPage } from "./pages/addSubjectPage";
import { Header } from "./components/header";
import { QueryClient, QueryClientProvider } from "react-query";
import { Posts } from "./pages/posts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { AlertSettingsProps } from "./types";
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

const initAlertData = {
  show: false,
  type: "",
  text: "text",
};

function App() {
  const [alert, setAlert] = useState<AlertSettingsProps>(initAlertData);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <BrowserRouter>
            <Header />
            {alert.show && (
              <Snackbar
                open={alert.show}
                autoHideDuration={5000}
                onClose={() => setAlert(initAlertData)}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <Alert
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setAlert(initAlertData);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  {alert.text}
                </Alert>
              </Snackbar>
            )}
            <Routes>
              <Route path="/" element={<Posts setAlert={setAlert} />} />
              <Route
                path="add"
                element={<AddSubjectPage setAlert={setAlert} />}
              />
              <Route
                path="edit/:id"
                element={<AddSubjectPage setAlert={setAlert} />}
              />
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
