import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Main from './main';
import theme from './themes';
import { TOOLTIP_ID } from './constants/tooltip';
import DefaultTooltip, { LightTooltip } from './styles/tooltip';
import { CW20MyTokenProvider } from './context/cw20MyTokenContext';
import { CW721NFTContractsProvider } from './context/cw721MyNFTContractsContext';
import { CW721NFTListProvider } from './context/cw721NFTListContext';
import { CW721OwnedNFTListProvider } from './context/cw721OwnedNFTListContext';
import { FirmaSDKProvider } from './context/firmaSDKContext';
import { ScrollProvider } from './context/scrollContext';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './constants/query-client';
import { ApolloClientProvider } from './context/apolloClientContext';
import { AuthProvider } from './context/authContext';
import { SnackbarProvider } from 'notistack';
import { ErrorSnackBar, SuccessSnackBar, WarningSnackBar } from './styles/snackbar';

const App = () => {
    return (
        <BrowserRouter>
            <SnackbarProvider
                preventDuplicate
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                maxSnack={5}
                autoHideDuration={3000}
                Components={{
                    success: SuccessSnackBar,
                    warning: WarningSnackBar,
                    error: ErrorSnackBar,
                    default: SuccessSnackBar,
                    info: SuccessSnackBar
                }}
            >
                <QueryClientProvider client={queryClient}>
                    <ThemeProvider theme={theme}>
                        <AuthProvider>
                            <FirmaSDKProvider>
                                <ApolloClientProvider>
                                    <CW20MyTokenProvider>
                                        <CW721NFTContractsProvider>
                                            <CW721NFTListProvider>
                                                <CW721OwnedNFTListProvider>
                                                    <ScrollProvider>
                                                        <Main />
                                                    </ScrollProvider>
                                                </CW721OwnedNFTListProvider>
                                            </CW721NFTListProvider>
                                        </CW721NFTContractsProvider>
                                    </CW20MyTokenProvider>
                                </ApolloClientProvider>
                            </FirmaSDKProvider>
                            <DefaultTooltip id={TOOLTIP_ID.COMMON} place="bottom" style={{ cursor: 'default', zIndex: 1000 }} />
                            <DefaultTooltip
                                id={TOOLTIP_ID.CLICKABLE}
                                place="bottom"
                                style={{ cursor: 'default', zIndex: 1000 }}
                                clickable
                            />
                            <LightTooltip id={TOOLTIP_ID.LIGHT} place="bottom" style={{ cursor: 'default', zIndex: 1000 }} />
                        </AuthProvider>
                    </ThemeProvider>
                </QueryClientProvider>
            </SnackbarProvider>
        </BrowserRouter>
    );
};

export default App;
