import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container } from '@/styles/instantiate';
import { rootState } from '@/redux/reducers';
import useApollo from '@/hooks/useApollo';
import { Content, Header } from '@/components/organisms/cw721/nftContractDetail';
import useNFTContractDetail from '@/hooks/useNFTContractDetail';
import useNFTContractDetailStore from '@/store/useNFTContractDetailStore';

const NFTContractDetail = () => {
    const isInit = useSelector((state: rootState) => state.wallet.isInit);
    const address = useSelector((state: rootState) => state.wallet.address);

    const { setContractDetail, setNftsInfo, setTransactions, clearForm, setOwnedNftsInfo } = useNFTContractDetailStore();

    const contractAddress = window.location.pathname.replace('/cw721/mynft/detail/', '');

    const { getNFTContractDetail, getNFTsInfo, getOwnedNFTsInfo, getNFTContractTransactions } = useNFTContractDetail();

    const { client } = useApollo();

    const getRequiredInfo = async () => {
        if (isInit && client) {
            const detail = await getNFTContractDetail(contractAddress);
            const nfts = await getNFTsInfo(contractAddress);
            const txData = await getNFTContractTransactions(contractAddress);
            const ownedNfts = await getOwnedNFTsInfo(contractAddress, address);

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
        return () => clearForm();
    }, []);

    return (
        <Container style={{ padding: '68px 88px 68px 96px', gap: '40px' }}>
            <Header />
            <Content />
        </Container>
    );
};

export default React.memo(NFTContractDetail);
