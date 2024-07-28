import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import TokenInfo from '../cards/tokenInfo';
import Preview from '../cards/preview';

import useExecuteHook, { ITokenInfoState } from '../hooks/useExecueteHook';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { useSnackbar } from 'notistack';
import useExecuteStore from '../hooks/useExecuteStore';
import { isValidAddress } from '@/utils/address';
import useExecuteActions from '../action';

const Container = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 32px;
    padding: 36px 96px 115px;
`;

const DimBox = styled.div`
    flex: 1;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Contents = () => {
    const address = useSelector((state: rootState) => state.wallet.address);
    const contractAddress = useExecuteStore((state) => state.contractAddress);
    const clearForm = useExecuteStore((state) => state.clearForm);
    const { setContractInfo, setTokenInfo, setMarketingInfo, setMinterInfo, setCw20Balance, setFctBalance } = useExecuteActions();

    useEffect(() => {
        clearForm();
    }, []);

    useEffect(() => {
        if (isValidAddress(contractAddress) && isValidAddress(address)) {
            setContractInfo(contractAddress);
            setTokenInfo(contractAddress);
            setMarketingInfo(contractAddress);
            setMinterInfo(contractAddress);
            setCw20Balance(contractAddress, address);
            setFctBalance(address);
        }
    }, [contractAddress, address]);
    
    return contractAddress ? (
        <Container>
            <Fragment>
                <TokenInfo />
                <Preview />
            </Fragment>
        </Container>
    ) : (
        <DimBox>{/* <img src={FIRMA_DIM_LOGO} alt={'Firmachain'} style={{ width: '480px', height: '480px' }} /> */}</DimBox>
    );
};

export default Contents;
