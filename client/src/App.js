import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./utils/Theme";
import './index.css';
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import ChristmasOverlay from "./components/ChristmasOverlay";

const Container = styled.div`
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  width: 100%;
  display: flex;
  overflow-x: hidden;
  overflow-x: hidden;
  transition: all 0.2s ease;
  position: relative;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  flex:3;
`;

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Container>
        <Wrapper>
          <BrowserRouter>
            <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            <Routes>
              <Route path="/" element={<Home/>} exact/>
              <Route path="/post" element={<CreatePost/>} exact/>
              <Route path="/about" element={<About/>} />
            </Routes>
          </BrowserRouter>
        </Wrapper>
        <ChristmasOverlay />
      </Container>
    </ThemeProvider>
  );
}

export default App;
