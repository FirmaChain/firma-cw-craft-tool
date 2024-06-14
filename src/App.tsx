import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import './styles/index.css';

import Main from './main';
import theme from './themes';
import { rootState } from './redux/reducers';
import ConnectWalletModal from './components/organisms/modal/connectWalletModal';
import QrConfirmModal from './components/organisms/modal/qrConfirmModal';
import TxConfirmModal from './components/organisms/modal/txConfirmModal';

const App = () => {
  const {
    connectWallet,
    qrConfirm,
    txConfirm,
  } = useSelector((state: rootState) => state.modal);
  
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Main />
        {connectWallet && <ConnectWalletModal />}
        {qrConfirm && <QrConfirmModal />}
        {txConfirm && <TxConfirmModal />}
      </ThemeProvider>
    </BrowserRouter>
  )
};

export default App;