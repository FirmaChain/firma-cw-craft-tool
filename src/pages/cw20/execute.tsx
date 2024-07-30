import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import useExecuteStore from '@/components/organisms/execute/hooks/useExecuteStore';
import Header from '@/components/organisms/execute/header';
import Contents from '@/components/organisms/execute/contents';
import { Container } from '@/styles/instantiate';
import React from 'react';

const CW20Execute = () => {
    const query = new URLSearchParams(useLocation().search);
    const contractAddress = query.get('contractAddress');

    const setContractAddress = useExecuteStore((state) => state.setContractAddress);

    useEffect(() => {
        if (contractAddress === null) return;
        setContractAddress(contractAddress);
    }, [contractAddress])

    return (
        <Container>
            <Header contractAddress={contractAddress === null ? '' : contractAddress} />
            <Contents />
        </Container>
    );
};

export default React.memo(CW20Execute);
