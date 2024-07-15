import styled from 'styled-components';

import { useContractContext } from '../context/contractContext';
import MintPreview from './previews/mint';
import { ITokenInfoState } from '../hooks/useExecueteHook';
import DefaultView from './previews/default';
import BurnPreview from './previews/burn';
import BurnFromPreview from './previews/burnFrom';

const Container = styled.div<{ $isSelectMenu: boolean }>`
    width: 100%;
    display: flex;
    height: auto;
    padding: 48px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 24px;
    border-radius: 24px;
    border: ${(props) => (props.$isSelectMenu ? '1px solid var(--Green-500, #02e191)' : '1px solid var(--Green-500, #444)')};
    background: var(--200, #1e1e1e);
`;

const TitleTypo = styled.div`
    color: var(--Gray-800, #e6e6e6);
    font-family: 'General Sans Variable';
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
`;

interface IProps {
    tokenInfoState: ITokenInfoState;
}

const Preview = ({ tokenInfoState }: IProps) => {
    const { selectMenu } = useContractContext();

    return (
        <Container $isSelectMenu={!(selectMenu.value === 'select' || selectMenu.value === '')}>
            <TitleTypo>{'EXECUTION PREVIEW'}</TitleTypo>
            {(selectMenu.value === 'select' || selectMenu.value === '') && <DefaultView />}
            {selectMenu.value === 'mint' && (
                <MintPreview
                    minterCap={tokenInfoState.minter.cap}
                    totalSupply={tokenInfoState.totalSupply}
                    decimals={tokenInfoState.decimals}
                    tokenSymbol={tokenInfoState.tokenSymbol}
                />
            )}
            {selectMenu.value === 'burn' && (
                <BurnPreview
                    tokenSymbol={tokenInfoState.tokenSymbol}
                    addressAmount={tokenInfoState.addressAmount}
                    decimals={tokenInfoState.decimals}
                />
            )}
            {selectMenu.value === 'burnFrom' && (
                <BurnFromPreview
                    totalSupply={tokenInfoState.totalSupply}
                    decimals={tokenInfoState.decimals}
                    tokenSymbol={tokenInfoState.tokenSymbol}
                />
            )}
        </Container>
    );
};

export default Preview;
