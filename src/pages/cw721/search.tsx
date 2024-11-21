import React, { useEffect } from 'react';
import { Header, Content } from '@/components/organisms/cw721/search';
import { Container } from '@/styles/instantiate';
import { useCW721Search } from '@/context/cw721SearchContext';
import useGlobalStore from '@/store/globalStore';

const CW721SearchPage = () => {
    const { clearAll } = useCW721Search();
    const { handleGlobalLoading } = useGlobalStore();

    useEffect(() => {
        return () => {
            clearAll();
            handleGlobalLoading(false);
        };
    }, []);

    return (
        <Container style={{ gap: '0px' }}>
            <Header />
            <Content />
        </Container>
    );
};

export default React.memo(CW721SearchPage);
