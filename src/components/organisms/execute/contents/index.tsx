import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import TokenInfo from '../cards/tokenInfo';
import Preview from '../cards/preview';
import { useContractContext } from '../context/contractContext';

import useExecuteHook, { ITokenInfoState } from '../hooks/useExecueteHook';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { useSnackbar } from 'notistack';

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
    const walletAddress = useSelector((state: rootState) => state.wallet.address);

    const { _contract, _isFetched, _setSelectMenu, _setIsFetched } = useContractContext();
    const { getContractTokenInfo } = useExecuteHook();
    const { enqueueSnackbar } = useSnackbar();

    const [contractTokenInfo, setContractTokenInfo] = useState<ITokenInfoState | null>(null);

    const fetchTokenInfo = useCallback(async () => {
        try {
            const info = await getContractTokenInfo(_contract, walletAddress);

            if (info.success) setContractTokenInfo(info);
            else {
                setContractTokenInfo(null);
                enqueueSnackbar({ variant: 'error', message: 'Invalid address.' });
            }
        } catch (error) {
            console.log(error);
        }
    }, [_contract]);

    const ContractExist = useMemo(() => {
        return !Boolean(_contract === '');
    }, [_contract]);

    useEffect(() => {
        if (ContractExist) {
            fetchTokenInfo();
            _setIsFetched(false);
        } else {
            _setSelectMenu({ value: 'select', label: 'Select' });
        }
    }, [_contract, ContractExist, _isFetched]);

    return (
        <Fragment>
            {ContractExist ? (
                <Container>
                    {contractTokenInfo === null ? (
                        <Fragment />
                    ) : (
                        <Fragment>
                            <TokenInfo tokenInfoState={contractTokenInfo} />
                            <Preview tokenInfoState={contractTokenInfo} />
                        </Fragment>
                    )}
                </Container>
            ) : (
                <DimBox>{/* <img src={FIRMA_DIM_LOGO} alt={'Firmachain'} style={{ width: '480px', height: '480px' }} /> */}</DimBox>
            )}
        </Fragment>
    );
};

export default Contents;
