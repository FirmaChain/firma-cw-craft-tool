import React, { useEffect } from 'react';
import Header from '@/components/organisms/cw721/execute/header';
import { Container } from '../../styles/instantiate';
import Contents from '@/components/organisms/cw721/execute/contents';
import { useCW721Execute } from '@/context/cw721ExecuteContext';

import useGlobalStore from '@/store/globalStore';
import useWalletStore from '@/store/walletStore';
import useContractAddressStore from '@/store/contractAddressStore';

const CW721Execute = () => {
    const { isInit } = useWalletStore();
    const { cw721, setCW721 } = useContractAddressStore();
    const context = useCW721Execute();
    const contractAddress = cw721 || context.contractAddress || '';
    const setContractAddress = context.setContractAddress;
    const clearForm = context.clearForm;

    const { handleGlobalLoading } = useGlobalStore();

    useEffect(() => {
        if (cw721) {
            setContractAddress(cw721);
            setCW721('');
        }
    }, []);

    useEffect(() => {
        return () => {
            handleGlobalLoading(false);
            clearForm();
        };
    }, []);

    return (
        <Container style={{ gap: '0px' }}>
            <Header contractAddress={contractAddress} />
            {isInit && <Contents />}
        </Container>
    );
};

export default React.memo(CW721Execute);
