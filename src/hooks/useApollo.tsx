import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { rootState } from '../redux/reducers';
import { NETWORKS } from '../constants/common';
import { CRAFT_CONFIGS } from '../config';

const useApollo = () => {
    const { network } = useSelector((state: rootState) => state.global);

    const [client, setClient] = useState<ApolloClient<any> | null>(null);

    useEffect(() => {
        const initialize = () => {
            const craftConfig = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET : CRAFT_CONFIGS.TESTNET;
            const uri = craftConfig.GRAPHQL_CONFIG.URI;

            const httpLink = createHttpLink({ uri: uri });
            const authLink = setContext((_, { headers }) => {
                return {
                    headers: {
                        ...headers,
                        'content-type': 'application/json',
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
    }, [network]);

    return {
        client
    };
};

export default useApollo;
