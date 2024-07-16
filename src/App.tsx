import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Main from './main';
import theme from './themes';
import { rootState } from './redux/reducers';
import ConnectWalletModal from './components/organisms/modal/connectWalletModal';
import QrConfirmModal from './components/organisms/modal/qrConfirmModal';
import TxConfirmModal from './components/organisms/modal/txConfirmModal';
import { TOOLTIP_ID } from './constants/tooltip';
import DefaultTooltip from './styles/tooltip';
import './styles/index.css';
import './styles/font.css';
import 'react-tooltip/dist/react-tooltip.css';
const App = () => {
    const { connectWallet, qrConfirm, txConfirm } = useSelector((state: rootState) => state.modal);

    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Main />
                {connectWallet && <ConnectWalletModal />}
                {qrConfirm && <QrConfirmModal />}
                {txConfirm && <TxConfirmModal />}
                <DefaultTooltip id={TOOLTIP_ID.COMMON} place="bottom" style={{ cursor: 'default', zIndex: 100 }} />
                <DefaultTooltip id={TOOLTIP_ID.CLICKABLE} place="bottom" style={{ cursor: 'default', zIndex: 100 }} clickable />
            </ThemeProvider>
        </BrowserRouter>
    );
};

export default App;
