import React, { useEffect } from 'react';
import { Header, Content } from '@/components/organisms/search';
import { Container } from '@/styles/instantiate';
import { useCW20Search } from '@/context/cw20SearchContext';
import useGlobalStore from '@/store/globalStore';

const CW20SearchPage = () => {
    const { clearAll } = useCW20Search();
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

export default React.memo(CW20SearchPage);
