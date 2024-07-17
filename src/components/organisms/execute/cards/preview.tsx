import styled from 'styled-components';

import { useContractContext } from '../context/contractContext';
import MintPreview from './previews/mint';
import { ITokenInfoState } from '../hooks/useExecueteHook';
import DefaultView from './previews/default';
import BurnPreview from './previews/burn';
import BurnFromPreview from './previews/burnFrom';
import TransferPreview from './previews/transfer';
import UpdateMarketingPreview from './previews/updateMarketing';
import IncreaseAllowancePreview from './previews/increaseAllowance';
import TransferFromPreview from './previews/transferFrom';

const Container = styled.div<{ $isSelectMenu: boolean }>`
    width: 100%;
    display: flex;
    height: auto;
    padding: 48px 48px 40px;
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
    const { _selectMenu } = useContractContext();

    return (
        <Container $isSelectMenu={!(_selectMenu.value === 'select' || _selectMenu.value === '')}>
            <TitleTypo>{'EXECUTION PREVIEW'}</TitleTypo>
            {(_selectMenu.value === 'select' || _selectMenu.value === '') && <DefaultView />}
            {_selectMenu.value === 'mint' && (
                <MintPreview
                    minterCap={tokenInfoState.minter.cap}
                    totalSupply={tokenInfoState.totalSupply}
                    decimals={tokenInfoState.decimals}
                    tokenSymbol={tokenInfoState.tokenSymbol}
                />
            )}
            {_selectMenu.value === 'burn' && (
                <BurnPreview
                    tokenSymbol={tokenInfoState.tokenSymbol}
                    addressAmount={tokenInfoState.addressAmount}
                    decimals={tokenInfoState.decimals}
                />
            )}
            {_selectMenu.value === 'burnFrom' && (
                <BurnFromPreview
                    totalSupply={tokenInfoState.totalSupply}
                    decimals={tokenInfoState.decimals}
                    tokenSymbol={tokenInfoState.tokenSymbol}
                />
            )}
            {_selectMenu.value === 'transfer' && (
                <TransferPreview
                    addressAmount={tokenInfoState.addressAmount}
                    decimals={tokenInfoState.decimals}
                    tokenSymbol={tokenInfoState.tokenSymbol}
                />
            )}
            {_selectMenu.value === 'updateMarketing' && (
                <UpdateMarketingPreview
                    label={tokenInfoState.label}
                    marketingDescription={tokenInfoState.marketingDescription}
                    marketingAddress={tokenInfoState.marketingAddress}
                    marketingProject={tokenInfoState.marketingProject}
                />
            )}

            {_selectMenu.value === 'increaseAllowance' && (
                <IncreaseAllowancePreview
                    addressAmount={tokenInfoState.addressAmount}
                    decimals={tokenInfoState.decimals}
                    tokenSymbol={tokenInfoState.tokenSymbol}
                />
            )}

            {_selectMenu.value === 'decreaseAllowance' && (
                <IncreaseAllowancePreview
                    addressAmount={tokenInfoState.addressAmount}
                    decimals={tokenInfoState.decimals}
                    tokenSymbol={tokenInfoState.tokenSymbol}
                />
            )}

            {_selectMenu.value === 'transferFrom' && (
                <TransferFromPreview
                    addressAmount={tokenInfoState.addressAmount}
                    decimals={tokenInfoState.decimals}
                    tokenSymbol={tokenInfoState.tokenSymbol}
                />
            )}

            {/* TransferFromPreview */}
        </Container>
    );
};

export default Preview;
