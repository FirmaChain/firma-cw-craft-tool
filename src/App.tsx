import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Main from './main';
import theme from './themes';
import { TOOLTIP_ID } from './constants/tooltip';
import DefaultTooltip, { LightTooltip } from './styles/tooltip';
import './styles/index.css';
import './styles/font.css';
import 'react-tooltip/dist/react-tooltip.css';
import 'overlayscrollbars/overlayscrollbars.css';
import 'react-datepicker/dist/react-datepicker.css';

const App = () => {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Main />

                <DefaultTooltip id={TOOLTIP_ID.COMMON} place="bottom" style={{ cursor: 'default', zIndex: 1000 }} />
                <DefaultTooltip id={TOOLTIP_ID.CLICKABLE} place="bottom" style={{ cursor: 'default', zIndex: 1000 }} clickable />
                <LightTooltip id={TOOLTIP_ID.LIGHT} place="bottom" style={{ cursor: 'default', zIndex: 1000 }} />
            </ThemeProvider>
        </BrowserRouter>
    );
};

export default App;
