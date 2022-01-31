import React, { useState } from "react";
import Nb from "./modules/Navbar/Navbar";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, GlobalStyles } from "./themes/themes";
import NewsItem from "./modules/NewsItem/NewsItem";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatorPage from "./Pages/CreatorPage";
import Inicio from "./Pages/Inicio";
import Footer from "./modules/Footer/Footer";
import Categories from "./modules/Categories/Categories";
import Search from "./modules/Search/Search";
import CreateForm from "./modules/CreateForm/CreateForm";
import Config from "./modules/Config/Config";
import Auth from "./modules/Auth/Auth";
import { Access, token } from "./Access";
import ProtectedRoute from "./modules/ProtectedRoute";
const StyledApp = styled.div``;

const App = () => {
  const [theme, setTheme] = useState("light");
  const [logged, setLogged] = useState(false)
  const [tokenValue, setTokenValue] = useState("")

  const handleTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <div>
      <BrowserRouter>
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
          <GlobalStyles />
          <StyledApp>
            <Nb themeMode={handleTheme}></Nb>

            <Access.Provider value={{logged,setLogged}}>
            <token.Provider value={{tokenValue, setTokenValue}}>
              <Routes>
                <Route exact path="/" element={<Inicio />} />
                <Route exact path="/noticias/:id" element={<NewsItem />} />
                {/* creator */}
                <Route exact path="/user" element={<Auth />} />
                <Route element={<ProtectedRoute/>}>

                  <Route exact path="/user/creator" element={<CreatorPage />} />
                <Route
                  exact
                  path="/user/creator/postcreate/:id"
                  element={<CreateForm />}
                />
                <Route exact path="/user/creator/config" element={<Config />} />
                </Route>

                <Route
                  exact
                  path="/categories/:category"
                  element={<Categories />}
                />
                <Route exact path="/search" element={<Search />} />
              </Routes>
            </token.Provider>
            </Access.Provider>

            <Footer />
          </StyledApp>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
