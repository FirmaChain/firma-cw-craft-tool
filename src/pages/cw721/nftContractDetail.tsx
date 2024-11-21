import React, { useEffect } from 'react';

import { Container } from '@/styles/instantiate';

import { Content, Header } from '@/components/organisms/cw721/nftContractDetail';
import useNFTContractDetail from '@/hooks/useNFTContractDetail';

import { useApolloClientContext } from '@/context/apolloClientContext';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useCW721Detail } from '@/context/cw721DetailStore';
import useWalletStore from '@/store/walletStore';

const NFTContractDetail = () => {
    const { address, isInit } = useWalletStore();

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { setContractDetail, setNftsInfo, setTransactions, clearForm, setOwnedNftsInfo } = useCW721Detail();

    const contractAddress = window.location.pathname.replace('/cw721/mynft/detail/', '');

    const { getNFTContractDetail, getNFTsInfo, getOwnedNFTsInfo, getNFTContractTransactions } = useNFTContractDetail();

    const { client } = useApolloClientContext();

    const getRequiredInfo = async () => {
        if (isInit && client) {
            const detail = await getNFTContractDetail(contractAddress);
            const nfts = await getNFTsInfo(contractAddress);
            const txData = await getNFTContractTransactions(contractAddress);
            const ownedNfts = await getOwnedNFTsInfo(contractAddress, address);

            if (detail.ownerInfo.owner?.toLowerCase() !== address.toLowerCase()) {
                enqueueSnackbar({ message: 'This contract is not owned by the connected wallet.', variant: 'error' });
                navigate('/cw721/mynft');
            }

            const currentContractAddress = window.location.pathname.replace('/cw721/mynft/detail/', '').toLowerCase();

            if (currentContractAddress === contractAddress.toLowerCase()) {
                setContractDetail(detail);
                setNftsInfo(nfts);
                setOwnedNftsInfo(ownedNfts);
                setTransactions(txData.txData);
            }
        }
    };

    useEffect(() => {
        getRequiredInfo();
    }, [client, isInit]);

    useEffect(() => {
        if (!address) {
            navigate('/cw721/mynft');
            enqueueSnackbar({ message: 'Connect your wallet first!', variant: 'error' });
        }
        return () => clearForm();
    }, []);

    return (
        address && (
            <Container style={{ padding: '68px 88px 68px 96px', gap: '40px' }}>
                <Header />
                <Content />
            </Container>
        )
    );
};

export default React.memo(NFTContractDetail);
