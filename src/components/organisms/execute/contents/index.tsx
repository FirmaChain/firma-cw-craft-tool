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
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 36px 96px 115px;
    position: relative;
`;

const Box = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(600px, 1fr));
    gap: 32px;
    max-width: 1600px;
`;

const NoticeText = styled.div`
    font-size: 18px;
    color: #999999;
    font-weight: 500;
`;

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
    const { checkContractExist, searchCW20Contract } = useExecuteActions();
    const { contractExist, setContractExist, tokenInfo } = useExecuteStore();

    const checkExist = async () => {
        const exist = await checkContractExist(contractAddress);
        setContractExist(exist);
    };

    useEffect(() => {
        if (contractAddress && address) {
            if (isValidAddress(contractAddress) && isValidAddress(address)) {
                checkExist();
            } else {
                setContractExist(false);
            }
        }
    }, [contractAddress, address]);

    useEffect(() => {
        if (contractAddress !== null && Boolean(contractExist) === true) {
            searchCW20Contract(contractAddress, address);
        }
    }, [contractExist, contractAddress, address]);

    return (
        <Fragment>
            <Container>
                {contractExist === true && tokenInfo && (
                    <Box>
                        <TokenInfo />
                        <Preview />
                    </Box>
                )}

                {contractExist === false && (
                    <Box>
                        <TokenInfo />
                        <Preview />
                    </Box>
                )}

                {contractExist === null && (
                    <LogoBackground>
                        <img src={FIRMA_DIM_LOGO} alt="logo" className="logo" />
                    </LogoBackground>
                )}
            </Container>
        </Fragment>
    );
};

export default Contents;
