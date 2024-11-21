import styled from 'styled-components';

import useFormStore from '@/store/formStore';

import { Container } from '@/styles/instantiate';
import { Content, Header, Preview } from '@/components/organisms/cw721/instantiate';
import React, { useEffect, useMemo } from 'react';
import { useCW721Instantiate } from '@/context/cw721InstantiateContext';
import useGlobalStore from '@/store/globalStore';

export const MainContent = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
`;

export const Box = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(600px, 1fr));
    gap: 32px;
    max-width: 1600px;
    position: relative;
`;

const CW721Instantiate = () => {
    const { contractMode, handleMode } = useGlobalStore();

    const clearForm = useFormStore((state) => state.clearForm);
    const { clearForm: clearInput } = useCW721Instantiate();

    useEffect(() => {
        return () => {
            handleMode('BASIC');
            clearForm();
            clearInput();
        };
    }, []);

    const isBasic = useMemo(() => {
        return contractMode === 'BASIC';
    }, [contractMode]);

    return (
        <Container style={{ padding: '61px 88px 61px 96px' }}>
            <Header />
            <MainContent>
                <Box>
                    <Content isBasic={isBasic} />
                    <Preview />
                </Box>
            </MainContent>
        </Container>
    );
};

export default React.memo(CW721Instantiate);
