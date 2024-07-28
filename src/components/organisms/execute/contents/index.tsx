import { useEffect } from 'react';
import styled from 'styled-components';

import TokenInfo from '../cards/tokenInfo';
import Preview from '../cards/preview';

import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import useExecuteStore from '../hooks/useExecuteStore';
import { isValidAddress } from '@/utils/address';
import useExecuteActions from '../action';

const Container = styled.div`
    width: 100%;
    display :flex;
    align-items: flex-start;
    justify-content: center;
    padding: 36px 96px 115px;
`;

const Box = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(600px, 1fr));
    gap: 32px;
    max-width: 1600px;
`

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
            <Box>
                <TokenInfo />
                <Preview />
            </Box>
        </Container>
    ) : (
        <DimBox>{/* <img src={FIRMA_DIM_LOGO} alt={'Firmachain'} style={{ width: '480px', height: '480px' }} /> */}</DimBox>
    );
};

export default Contents;
