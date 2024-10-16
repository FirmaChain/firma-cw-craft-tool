import React, { useEffect } from 'react';
import useCW721ExecuteStore from '@/components/organisms/cw721/execute/hooks/useCW721ExecuteStore';
import Header from '@/components/organisms/cw721/execute/header';
import { Container } from '../../styles/instantiate';
import Contents from '@/components/organisms/cw721/execute/contents';
import { GlobalActions } from '@/redux/actions';

const CW721Execute = () => {
    const contractAddress = useCW721ExecuteStore((state) => state.contractAddress);
    const setContractAddress = useCW721ExecuteStore((state) => state.setContractAddress);

    useEffect(() => {
        if (contractAddress === null) return;
        setContractAddress(contractAddress);
    }, [contractAddress]);

    useEffect(() => {
        return () => {
            GlobalActions.handleGlobalLoading(false);
            useCW721ExecuteStore.getState().clearForm();
        };
    }, []);

    return (
        <Container style={{ gap: '0px' }}>
            <Header contractAddress={contractAddress === null ? '' : contractAddress} />
            <Contents />
        </Container>
    );
};

export default React.memo(CW721Execute);
