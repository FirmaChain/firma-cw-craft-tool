import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import './styles/index.css';

import Main from './main';
import theme from './themes';
import { rootState } from './redux/reducers';
import ConnectWalletModal from './components/organisms/modal/connectWalletModal';

const App = () => {
  const {
    connectWallet,
  } = useSelector((state: rootState) => state.modal);
  
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Main />
        {connectWallet && <ConnectWalletModal />}
      </ThemeProvider>
    </BrowserRouter>
  )
};

export default App;