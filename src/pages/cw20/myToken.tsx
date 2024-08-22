import React from 'react';

import { Header, MyTokenContent } from '@/components/organisms/myToken';
import { Container } from '@/styles/instantiate';

const Cw20MyToken = () => {
    return (
        <Container style={{ paddingTop: '68px', gap: '20px', height: '100%' }}>
            {/* 96px */}
            <Header />
            <MyTokenContent />
        </Container>
    );
};

export default React.memo(Cw20MyToken);
