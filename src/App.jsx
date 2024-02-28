import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Homepage } from "./components/home";
import { createContext, lazy, Suspense } from "react";
const Exacc = lazy(() => import("./components/exercise"))
import { useTheme, useMediaQuery, Box, CircularProgress } from "@mui/material";
export const Gymstate = createContext();
function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const appStyles = {
    paper: {
      maxWidth: "100%",
      marginBlockStart: 4,
      paddingBlockEnd: 2,
      display: "flex",
      justifyContent: "center",
      alignItems: "baseline",
      flexDirection: "column",
      gap: 2,
      height: "100%",
      "&:hover": {
        pointer: "cursor",
      },
      borderTop: "4px solid red",
    },
    gymbutton: {
      backgroundColor: "#ffa929",
      color: "white",
      borderRadius: 4,
      fontSize: isMobile ? 10 : "",
    },
    gymtext: {
      paddingInlineStart: isMobile ? 1 : 2,
      "&::first-letter": {
        textTransform: 'uppercase'
      }
    }
  };

  const scroll_navigation = (selector, pixelvalue) => {
    const items = document.querySelector(selector);
    items.scrollBy({
      top: 0,
      left: pixelvalue,
      behavior: "smooth",
    });
  };
  return (
    <Gymstate.Provider
      value={{
        isMobile,
        appStyles,
        scroll_navigation
      }}
    >
      <HashRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/:exercisetype"
            element={
              <Suspense fallback={<Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100svh'
              }}>
                <CircularProgress color="primary" />

              </Box>}>
                <Exacc />
              </Suspense>
            }
          />
        </Routes>
      </HashRouter>
    </Gymstate.Provider>
  );
}

export default App;
