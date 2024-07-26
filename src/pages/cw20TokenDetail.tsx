import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { rootState } from '../redux/reducers';
import { Header, TokenDetailContent } from '../components/organisms/tokenDetail';
import useTokenDetail from '../hooks/useTokenDetail';
import useApollo from '../hooks/useApollo';
import { getTransactionsByAddress } from '../apollo/queries';
import { ITransaction } from '../interfaces/cw20';
import { determineMsgTypeAndSpender } from '../utils/common';
import { Container } from '@/styles/instantiate';
import useTokenDetailStore from '@/store/useTokenDetailStore';

const Cw20TokenDetail = () => {
    const isInit = useSelector((state: rootState) => state.wallet.isInit);
    const address = useSelector((state: rootState) => state.wallet.address);
    const setTokenDetail = useTokenDetailStore((state) => state.setTokenDetail);
    const setTransactions = useTokenDetailStore((state) => state.setTransactions);

    const contractAddress = window.location.pathname.replace('/mytoken/detail/', '');

    const { getTokenDetail } = useTokenDetail();

    const { client } = useApollo();

    const getRequiredInfo = async () => {
        if (isInit && client) {
            const tokenDetail = await getTokenDetail(contractAddress, address);
            const { messagesByAddress } = await getTransactionsByAddress(client, contractAddress, 15);

            const result: ITransaction[] = [];

            for (const message of messagesByAddress) {
                const { block, hash, height, messages, success } = message.transaction;
                const type = determineMsgTypeAndSpender(messages);

                result.push({
                    hash: hash,
                    height: height.toString(),
                    timestamp: block.timestamp,
                    type: type[0].type,
                    address: type[0].sender,
                    success: success
                });
            }

            setTokenDetail({ ...tokenDetail, contractAddress });
            setTransactions(result);
        }
    };

    useEffect(() => {
        getRequiredInfo();
    }, [client, isInit]);

    useEffect(() => {
        return () => useTokenDetailStore.getState().clearForm();
    }, []);

    return (
        <Container style={{ padding: '68px 96px', gap: '40px' }}>
            <Header />
            <TokenDetailContent />
        </Container>
    );
};

export default React.memo(Cw20TokenDetail);
