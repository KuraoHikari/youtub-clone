import { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Menu from './components/Menu';
import Navbar from './components/Navbar';
import { darkTheme, lightTheme } from './utils/Theme';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Video from './pages/Video';
import Sign from './pages/Sign';
import Search from './pages/Search';

const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`;
const Wrapper = styled.div`
  padding: 22px 96px;
`;
function App() {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          {/* {menu} */}
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          {/* {main} */}
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random" />} />
                  <Route path="trends" element={<Home type="trend" />} />
                  <Route path="search" element={<Search />} />
                  <Route path="subscription" element={<Home type="sub" />} />
                  <Route path="login" element={<Sign />} />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
