import { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';

import TokenInfo from '../cards/tokenInfo';
import Preview from '../cards/preview';

import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import useExecuteStore from '../hooks/useExecuteStore';
import { isValidAddress } from '@/utils/address';
import useExecuteActions from '../action';
import { FIRMA_DIM_LOGO } from '@/components/atoms/icons/pngIcons';

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

const NoticeText = styled.div`
    font-size: 18px;
    color: #999999;
    font-weight: 500;
`

const DimBox = styled.div`
    flex: 1;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const LogoBackground = styled.div`
    position: fixed;
    width: -webkit-fill-available;
    height: -webkit-fill-available;
    display: flex;
    align-items: center;
    justify-content: center;

    .logo {
        width: 480px;
    }
`;

const Contents = () => {
    const address = useSelector((state: rootState) => state.wallet.address);
    const contractAddress = useExecuteStore((state) => state.contractAddress);
    const clearForm = useExecuteStore((state) => state.clearForm);
    const { checkContractExist, setContractInfo, setTokenInfo, setMarketingInfo, setMinterInfo, setCw20Balance, setFctBalance } = useExecuteActions();

    const [existContract, setExistContract] = useState<Boolean | null>(null);

    useEffect(() => {
        clearForm();
    }, []);

    const checkExist = async () => {
        const exist = await checkContractExist(contractAddress);
        setExistContract(exist);
    }

    useEffect(() => {
        if (isValidAddress(contractAddress) && isValidAddress(address)) {
            checkExist();
        } else {
            setExistContract(false);
        }
    }, [contractAddress, address]);

    useEffect(() => {
        if (contractAddress !== null && Boolean(existContract) === true) {
            setContractInfo(contractAddress);
            setTokenInfo(contractAddress);
            setMarketingInfo(contractAddress);
            setMinterInfo(contractAddress);
            setCw20Balance(contractAddress, address);
            setFctBalance(address);
        }
    }, [existContract, contractAddress, address])

    return (
        <Fragment>
            {existContract === null && <DimBox />}
            <Container>
                {/* {existContract === false && <NoticeText>{'No contracts have been deployed.'}</NoticeText>} */}
                {existContract === false && (
                    <LogoBackground>
                        <img src={FIRMA_DIM_LOGO} alt="logo" className="logo" />
                    </LogoBackground>
                )}
                {existContract === true &&
                    <Box>
                        <TokenInfo />
                        <Preview />
                    </Box>}
            </Container>
        </Fragment>
    )
};

export default Contents;
