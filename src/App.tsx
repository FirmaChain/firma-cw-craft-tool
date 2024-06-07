import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import './styles/index.css';

import Main from './main';
import theme from './themes';

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Main />
      </ThemeProvider>
    </BrowserRouter>
  )
};

export default App;