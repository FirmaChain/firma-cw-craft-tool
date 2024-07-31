import React from 'react';

import { Header, MyNFTContent } from '@/components/organisms/cw721/myNFTContracts';
import { Container } from '@/styles/instantiate';

const CW721MyNFTContracts = () => {
    return (
        <Container style={{ padding: '68px 96px', gap: '20px', height: '100%' }}>
            <Header />
            <MyNFTContent />
        </Container>
    );
};

export default React.memo(CW721MyNFTContracts);
