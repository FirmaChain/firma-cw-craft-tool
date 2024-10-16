import { createContext, useContext, ReactNode, useEffect, useRef } from 'react';
import { useRefreshToken } from '@/api/queries';
import { rootState } from '@/redux/reducers';
import { getAccessToken, setAccessToken } from '@/utils/token';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

interface AuthContextProps {
    refreshToken: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within a AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const accessToken = getAccessToken();
    const walletAddress = useSelector((v: rootState) => v.wallet.address);
    const { enqueueSnackbar } = useSnackbar();

    const { refetch } = useRefreshToken(
        { walletAddress },
        {
            enabled: false,
            onSuccess: (data) => {
                if (data?.result?.token) {
                    setAccessToken(data.result.token, { minutes: 14 });
                } else {
                    enqueueSnackbar({
                        message: (
                            <>
                                Failed to get the authentication key.
                                <br />
                                Some features may not work.
                            </>
                        ),
                        variant: 'error'
                    });
                }
            },
            onError: (error) => {
                console.log(error);
                enqueueSnackbar({
                    message: (
                        <>
                            Failed to get the authentication key.
                            <br />
                            Some features may not work.
                        </>
                    ),
                    variant: 'error'
                });
            }
        }
    );

    const timer = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (timer.current) {
            clearTimeout(timer.current);
            timer.current = null;
        }

        if (accessToken) {
            timer.current = setTimeout(() => refetch(), 15 * 60 * 1000);
        }
    }, [accessToken]);

    return (
        <AuthContext.Provider
            value={{
                refreshToken: refetch
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
