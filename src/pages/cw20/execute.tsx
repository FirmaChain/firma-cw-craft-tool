import { useEffect } from 'react';
import Header from '@/components/organisms/execute/header';
import Contents from '@/components/organisms/execute/contents';
import { Container } from '@/styles/instantiate';
import React from 'react';
import { useCW20Execute } from '@/context/cw20ExecuteContext';
import useGlobalStore from '@/store/globalStore';
import useContractAddressStore from '@/store/contractAddressStore';
import useWalletStore from '@/store/walletStore';
import { sleep } from '@/utils/common';

const CW20Execute = () => {
    const { isInit } = useWalletStore();
    const { contractAddress, setContractAddress, clearForm } = useCW20Execute();

    const { cw20, setCW20 } = useContractAddressStore();
    const { handleGlobalLoading } = useGlobalStore();

    const _contractAddress = cw20 || contractAddress || '';

    useEffect(() => {
        if (_contractAddress) {
            sleep(100).then(() => {
                setContractAddress(_contractAddress);
                setCW20('');
            });
        }

        return () => {
            handleGlobalLoading(false);
            clearForm();
        };
    }, []);

    return (
        <Container style={{ gap: '0px' }}>
            <Header contractAddress={_contractAddress} />
            {isInit && <Contents />}
        </Container>
    );
};

export default React.memo(CW20Execute);
