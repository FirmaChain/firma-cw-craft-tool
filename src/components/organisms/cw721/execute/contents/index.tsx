import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { rootState } from '@/redux/reducers';
import { isValidAddress } from '@/utils/address';
import { FIRMA_DIM_LOGO } from '@/components/atoms/icons/pngIcons';

import useCW721ExecuteStore from '../hooks/useCW721ExecuteStore';
import useCW721ExecuteAction from '../hooks/useCW721ExecuteAction';
import CW721ContractInfo from '../cards/contractInfo';
import Preview from '../cards/preview';

const Container = styled.div`
    width: 100%;
    display: flex;
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
`;

const NoticeText = styled.div`
    font-size: 18px;
    color: #999999;
    font-weight: 500;
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
    const network = useSelector((v: rootState) => v.global.network);

    const contractAddress = useCW721ExecuteStore((state) => state.contractAddress);
    const contractExist = useCW721ExecuteStore((state) => state.contractExist);
    const setContractExist = useCW721ExecuteStore((state) => state.setContractExist);

    const { searchCW721Contract, setContractInfo, setNftContractInfo, setTotalNfts, setFctBalance, setOwnershipInfo, setMyNftList } =
        useCW721ExecuteAction();

    const clearForm = useCW721ExecuteStore((state) => state.clearForm);
    const contractName = useCW721ExecuteStore((state) => state.nftContractInfo.name);

    const { checkContractExist } = useCW721ExecuteAction();

    useEffect(() => {
        clearForm();
        setContractExist(null);
    }, [network]);

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
        if (contractAddress !== null && contractAddress !== '' && Boolean(contractExist) === true) {
            searchCW721Contract(contractAddress, address);
            setContractInfo(contractAddress);
            setNftContractInfo(contractAddress);
            setTotalNfts(contractAddress);
            setFctBalance(address);
            setOwnershipInfo(contractAddress);
            setMyNftList(contractAddress, address);
        }
    }, [contractExist, contractAddress, address]);

    return (
        <Fragment>
            <Container>
                {contractExist === true && contractName && (
                    <Box>
                        <CW721ContractInfo />
                        <Preview />
                    </Box>
                )}

                {contractExist === false && (
                    <Box>
                        <CW721ContractInfo />
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
