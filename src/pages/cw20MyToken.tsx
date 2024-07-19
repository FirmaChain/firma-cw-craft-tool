import React from 'react';

import { Header, MyTokenContent } from '@/components/organisms/myToken';
import { Container } from '@/styles/instantiate';

const Cw20MyToken = () => {
    return (
        <Container>
            <Header />
            <MyTokenContent />
        </Container>
    );
};

export default React.memo(Cw20MyToken);
