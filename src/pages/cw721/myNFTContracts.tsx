import React from 'react';

import { Header, MyNFTContent } from '@/components/organisms/cw721/myNFTContracts';
import { Container } from '@/styles/instantiate';

const CW721MyNFTContracts = () => {
    return (
        <Container style={{ paddingTop: '68px', gap: '20px', height: '100%' }}>
            {/* 96px */}
            <Header />
            <MyNFTContent />
        </Container>
    );
};

export default React.memo(CW721MyNFTContracts);
