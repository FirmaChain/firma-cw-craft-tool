import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import TokenInfo from '../cards/tokenInfo';
import Preview from '../cards/preview';
import { useContractContext } from '../context/contractContext';

import { FIRMA_DIM_LOGO } from '../../../atoms/icons/pngIcons';
import useExecuteHook, { ITokenInfoState } from '../hooks/useExecueteHook';

const Container = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 32px;
    padding-bottom: 19px;
`;

const DimBox = styled.div`
    flex: 1;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Contents = () => {
    const { contract, isFetched, setSelectMenu, setIsFetched } = useContractContext();
    const { getContractTokenInfo } = useExecuteHook();

    const [contractTokenInfo, setContractTokenInfo] = useState<ITokenInfoState | null>(null);

    const fetchTokenInfo = useCallback(async () => {
        try {
            const info = await getContractTokenInfo(contract);
            setContractTokenInfo(info);
        } catch (error) {
            console.log(error);
        }
    }, [contract]);

    const ContractExist = useMemo(() => {
        return !Boolean(contract === '');
    }, [contract]);

    useEffect(() => {
        if (ContractExist) {
            fetchTokenInfo();
            setIsFetched(false);
        } else {
            setSelectMenu({ value: 'select', label: 'Select' });
        }
    }, [ContractExist, isFetched]);

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
                <DimBox>
                    <img src={FIRMA_DIM_LOGO} alt={'Firmachain'} style={{ width: '480px', height: '480px' }} />
                </DimBox>
            )}
        </Fragment>
    );
};

export default Contents;
