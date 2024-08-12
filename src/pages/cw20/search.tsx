import React, { useEffect } from 'react';
import { Header, Content } from '@/components/organisms/search';
import { Container } from '@/styles/instantiate';
import useSearchStore from '@/components/organisms/search/searchStore';
import { GlobalActions } from '@/redux/actions';

const CW20SearchPage = () => {
    useEffect(() => {
        return () => {
            useSearchStore.getState().clearAll();
            GlobalActions.handleGlobalLoading(false);
        };
    }, []);

    return (
        <Container style={{ gap: '0px' }}>
            <Header />
            <Content />
        </Container>
    );
};

export default React.memo(CW20SearchPage);
