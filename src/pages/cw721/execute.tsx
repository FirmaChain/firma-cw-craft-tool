import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import useCW721ExecuteStore from '@/components/organisms/cw721/execute/hooks/useCW721ExecuteStore';
import Header from '@/components/organisms/cw721/execute/header';

import { Container } from '../../styles/instantiate';
import Contents from '@/components/organisms/cw721/execute/contents';

const CW721Execute = () => {
    const query = new URLSearchParams(useLocation().search);
    const contractAddress = query.get('contractAddress');

    const setContractAddress = useCW721ExecuteStore((state) => state.setContractAddress);

    useEffect(() => {
        if (contractAddress === null) return;
        setContractAddress(contractAddress);
    }, [contractAddress]);

    return (
        <Container style={{ gap: '0px' }}>
            <Header contractAddress={contractAddress === null ? '' : contractAddress} />
            <Contents />
        </Container>
    );
};


export default React.memo(CW721Execute);
