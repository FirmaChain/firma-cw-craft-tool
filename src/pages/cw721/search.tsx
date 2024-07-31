import React, { useEffect } from 'react';
import { Header, Content } from '@/components/organisms/cw721/search';
import { Container } from '@/styles/instantiate';
import useSearchStore from '@/components/organisms/search/searchStore';

const CW721SearchPage = () => {
    useEffect(() => {
        return () => useSearchStore.getState().clearAll();
    }, []);

    return (
        <Container>
            <Header />
            <Content />
        </Container>
    );
};

export default React.memo(CW721SearchPage);
