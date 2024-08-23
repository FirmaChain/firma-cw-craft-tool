import { useEffect } from 'react';
import useExecuteStore from '@/components/organisms/execute/hooks/useExecuteStore';
import Header from '@/components/organisms/execute/header';
import Contents from '@/components/organisms/execute/contents';
import { Container } from '@/styles/instantiate';
import React from 'react';
import { GlobalActions } from '@/redux/actions';

const CW20Execute = () => {
    const contractAddress = useExecuteStore((state) => state.contractAddress);
    const setContractAddress = useExecuteStore((state) => state.setContractAddress);

    useEffect(() => {
        if (contractAddress === null) return;
        setContractAddress(contractAddress);
    }, [contractAddress]);

    useEffect(() => {
        return () => {
            GlobalActions.handleGlobalLoading(false);
            useExecuteStore.getState().clearForm();
        };
    }, []);

    return (
        <Container style={{ gap: '0px' }}>
            <Header contractAddress={contractAddress === null ? '' : contractAddress} />
            <Contents />
        </Container>
    );
};

export default React.memo(CW20Execute);
