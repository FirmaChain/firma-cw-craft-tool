import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { Box, Container, MainContent } from '../../styles/instantiate';
import { Content, Header, Preview } from '../../components/organisms/instantiate';
import { rootState } from '@/redux/reducers';
import useFormStore from '@/store/formStore';
import { GlobalActions } from '@/redux/actions';
import useInstantiateStore from '@/components/organisms/instantiate/instaniateStore';
import { addStringAmountsArray } from '@/utils/balance';

const Cw20Instantiate = () => {
    const contractMode = useSelector((state: rootState) => state.global.contractMode);
    const walletList = useInstantiateStore((v) => v.walletList);

    const clearForm = useFormStore((state) => state.clearForm);
    const clearInput = useInstantiateStore((v) => v.clearForm);

    const isBasic = contractMode === 'BASIC';

    useEffect(() => {
        const sumAmount = addStringAmountsArray([...walletList.map((one) => one.amount)]);

        useInstantiateStore.getState().setTotalSupply(sumAmount.toString());
        useInstantiateStore.getState().setWalletCount(walletList.length);
    }, [walletList]);

    useEffect(() => {
        return () => {
            GlobalActions.handleMode('BASIC');
            clearForm();
            clearInput();
        };
    }, []);

    return (
        <Container style={{ padding: '61px 88px 61px 96px' }}>
            <Header />
            <MainContent>
                <Box>
                    <Content isBasic={isBasic} />
                    <Preview isBasic={isBasic} />
                </Box>
            </MainContent>
        </Container>
    );
};

export default React.memo(Cw20Instantiate);
