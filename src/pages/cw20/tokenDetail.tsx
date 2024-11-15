import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Header, TokenDetailContent } from '@/components/organisms/tokenDetail';
import { Container } from '@/styles/instantiate';
import useTokenDetailStore from '@/store/useTokenDetailStore';
import { rootState } from '@/redux/reducers';
import useTokenDetail from '@/hooks/useTokenDetail';
// import useApollo from '@/hooks/useApollo';
import { getTransactionsByAddress } from '@/apollo/queries';
import { determineMsgTypeAndSpender } from '@/utils/common';
import { ITransaction } from '@/interfaces/cw20';
import { useApolloClientContext } from '@/context/apolloClientContext';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const Cw20TokenDetail = () => {
    const isInit = useSelector((state: rootState) => state.wallet.isInit);
    const address = useSelector((state: rootState) => state.wallet.address);
    const setTokenDetail = useTokenDetailStore((state) => state.setTokenDetail);
    const setTransactions = useTokenDetailStore((state) => state.setTransactions);

    const contractAddress = window.location.pathname.replace('/mytoken/detail/', '');

    const { getTokenDetail } = useTokenDetail();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { client } = useApolloClientContext();
    // const { client } = useApollo();

    const getRequiredInfo = async () => {
        if (isInit && client) {
            const tokenDetail = await getTokenDetail(contractAddress, address);

            if (tokenDetail.admin.toLowerCase() !== address.toLowerCase()) {
                enqueueSnackbar({ message: 'This contract is not owned by the connected wallet.', variant: 'error' });
                navigate('/myToken');
            }

            const transactions = await getTransactionsByAddress(client, contractAddress, 15);

            const result: ITransaction[] = [];

            if (transactions !== null) {
                for (const message of transactions.messagesByAddress) {
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
            }

            const currentContractAddress = window.location.pathname.replace('/mytoken/detail/', '').toLowerCase();
            if (currentContractAddress.toLowerCase() === contractAddress?.toLowerCase()) {
                setTokenDetail({ ...tokenDetail, contractAddress });
                setTransactions(result);
            }
        }
    };

    useEffect(() => {
        getRequiredInfo();
    }, [client, isInit]);

    useEffect(() => {
        if (!address) {
            navigate('/mytoken');
            enqueueSnackbar({ message: 'Connect your wallet first!', variant: 'error' });
        }
        return () => useTokenDetailStore.getState().clearForm();
    }, []);

    return (
        address && (
            <Container style={{ padding: '68px 88px 68px 96px', gap: '40px' }}>
                <Header />
                <TokenDetailContent />
            </Container>
        )
    );
};

export default React.memo(Cw20TokenDetail);
