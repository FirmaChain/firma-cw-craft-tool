import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import TokenInfo from '../cards/tokenInfo';
import Preview from '../cards/preview';

import useExecuteHook, { ITokenInfoState } from '../hooks/useExecueteHook';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { useSnackbar } from 'notistack';
import useExecuteStore from '../hooks/useExecuteStore';

const Container = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 32px;
    padding: 36px 96px 115px;
`;

const DimBox = styled.div`
    flex: 1;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Contents = () => {
    const contractAddress = useExecuteStore((state) => state.contractAddress);

    return contractAddress ? (
        <Container>
            <Fragment>
                <TokenInfo />
                <Preview />
            </Fragment>
        </Container>
    ) : (
        <DimBox>{/* <img src={FIRMA_DIM_LOGO} alt={'Firmachain'} style={{ width: '480px', height: '480px' }} /> */}</DimBox>
    );
};

export default Contents;
