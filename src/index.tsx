import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react';
import { SnackbarProvider } from 'notistack';

import App from './App';
import { persistor, store } from './redux';
import { ErrorSnackBar, SuccessSnackBar, WarningSnackBar } from './styles/snackbar';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <SnackbarProvider
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
                <App />
            </SnackbarProvider>
        </PersistGate>
    </Provider>
);
