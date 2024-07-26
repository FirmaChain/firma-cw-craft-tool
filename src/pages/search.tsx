import React, { useEffect } from 'react';
import { Header, Content } from '@/components/organisms/search';
import { Container } from '@/styles/instantiate';
import Divider from '@/components/atoms/divider';
import useSearchStore from '@/components/organisms/search/searchStore';

const SearchPage = () => {
    useEffect(() => {
        //? clear store before leave
        return () => useSearchStore.getState().clearAll();
    }, []);

    return (
        <Container>
            <Header />
            {/* <Divider $color={'var(--Gray-300, #222)'} $direction={'horizontal'} /> */}
            <Content />
        </Container>
    );
};

export default React.memo(SearchPage);
