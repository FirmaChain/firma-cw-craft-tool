import { CRAFT_CONFIGS } from '@/config';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createContext, useContext, ReactNode } from 'react';

interface ApolloClientContextProps {
    client: ApolloClient<any>;
}

const ApolloClientContext = createContext<ApolloClientContextProps | undefined>(undefined);

export const useApolloClientContext = () => {
    const context = useContext(ApolloClientContext);
    if (!context) {
        throw new Error('useApolloClientContext must be used within a ApolloClientProvider');
    }
    return context;
};

export const ApolloClientProvider = ({ children }: { children: ReactNode }) => {
    const uri = CRAFT_CONFIGS.GRAPHQL_CONFIG.URI;

    const httpLink = createHttpLink({ uri: uri });
    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                'content-type': 'application/json'
            }
        };
    });

    const apolloClient = new ApolloClient({
        uri: uri,
        link: authLink.concat(httpLink),
        cache: new InMemoryCache()
    });

    return (
        <ApolloClientContext.Provider
            value={{
                client: apolloClient
            }}
        >
            {children}
        </ApolloClientContext.Provider>
    );
};
