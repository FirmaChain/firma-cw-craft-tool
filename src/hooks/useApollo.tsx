import { useEffect, useState } from 'react';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { CRAFT_CONFIGS } from '../config';

const useApollo = () => {
    const [client, setClient] = useState<ApolloClient<any> | null>(null);

    useEffect(() => {
        const initialize = () => {
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

            setClient(apolloClient);
        };

        initialize();
    }, []);

    return {
        client
    };
};

export default useApollo;
