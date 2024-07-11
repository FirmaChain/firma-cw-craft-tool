import React from 'react';

import { Container } from '../styles/myToken';
import { Header, MyTokenContent } from '../components/organisms/myToken';

const Cw20MyToken = () => {
    return (
        <Container>
            <Header />
            <MyTokenContent />
        </Container>
    );
};

export default React.memo(Cw20MyToken);
