import React, { useEffect } from 'react';
import { Header, Content } from '@/components/organisms/search';
import { Container } from '@/styles/instantiate';
import useSearchStore from '@/components/organisms/search/searchStore';

const SearchPage = () => {
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

export default React.memo(SearchPage);
