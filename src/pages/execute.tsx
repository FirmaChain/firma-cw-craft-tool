import { useLocation } from 'react-router-dom';
import Contents from '../components/organisms/execute/contents';
import Header from '../components/organisms/execute/header';
import { Container } from '../styles/instantiate';
import { useEffect } from 'react';
import useExecuteStore from '@/components/organisms/execute/hooks/useExecuteStore';

const Execute = () => {
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

export default Execute;
