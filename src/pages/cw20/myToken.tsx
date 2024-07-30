import React from 'react';

import { Header, MyTokenContent } from '@/components/organisms/myToken';
import { Container } from '@/styles/instantiate';

const Cw20MyToken = () => {
    return (
        <Container style={{ padding: '68px 96px', gap: '20px', height: '100%' }}>
            <Header />
            <MyTokenContent />
        </Container>
    );
};

export default React.memo(Cw20MyToken);
