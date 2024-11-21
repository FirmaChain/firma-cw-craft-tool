import React, { useEffect } from 'react';

import { Box, Container, MainContent } from '../../styles/instantiate';
import { Content, Header, Preview } from '../../components/organisms/instantiate';

import useFormStore from '@/store/formStore';
import { addStringAmountsArray } from '@/utils/balance';
import { useCW20Instantiate } from '@/context/cw20InstantiateContext';
import useGlobalStore from '@/store/globalStore';
import useWalletStore from '@/store/walletStore';

const Cw20Instantiate = () => {
    const { contractMode, handleMode } = useGlobalStore();

    const context = useCW20Instantiate();
    const walletList = context.walletList;

    const clearForm = useFormStore((state) => state.clearForm);
    const clearInput = context.clearForm;

    const setTotalSupply = context.setTotalSupply;
    const setWalletCount = context.setWalletCount;

    const isBasic = contractMode === 'BASIC';

    useEffect(() => {
        const sumAmount = addStringAmountsArray([...walletList.map((one) => one.amount)]);

        setTotalSupply(sumAmount.toString());
        setWalletCount(walletList.length);
    }, [walletList]);

    useEffect(() => {
        return () => {
            handleMode('BASIC');
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
