import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { rootState } from '@/redux/reducers';
import useFormStore from '@/store/formStore';

import useInstantiateStore from '@/components/organisms/instantiate/instaniateStore';
import { Container } from '@/styles/instantiate';
import { Content, Header, Preview } from '@/components/organisms/cw721/instantiate';
import React, { useEffect, useMemo } from 'react';
import { GlobalActions } from '@/redux/actions';

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
    const contractMode = useSelector((state: rootState) => state.global.contractMode);

    const clearForm = useFormStore((state) => state.clearForm);
    const clearInput = useInstantiateStore((v) => v.clearForm);

    useEffect(() => {
        return () => {
            GlobalActions.handleMode('BASIC');
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
