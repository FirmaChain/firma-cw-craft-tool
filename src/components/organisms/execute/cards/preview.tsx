import styled from 'styled-components';

import MintPreview from './previews/mint';
import { ITokenInfoState } from '../hooks/useExecueteHook';
import DefaultView from './previews/default';
import BurnPreview from './previews/burn';
import BurnFromPreview from './previews/burnFrom';
import TransferPreview from './previews/transfer';
import UpdateMarketingPreview from './previews/updateMarketing';
import IncreaseAllowancePreview from './previews/increaseAllowance';
import TransferFromPreview from './previews/transferFrom';
import UpdateMinter from './previews/updateMinter';
import DecreaseAllowancePreview from './previews/decreaseAllowance';
import UpdateLogo from './previews/updateLogo';
import useExecuteStore from '../hooks/useExecuteStore';

const Container = styled.div<{ $isSelectMenu: boolean }>`
    width: 100%;
    display: flex;
    height: fit-content;
    padding: 48px 48px 40px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 24px;
    border-radius: 24px;
    /* border: ${(props) => (props.$isSelectMenu ? '1px solid var(--Green-500, #02e191)' : '1px solid var(--Green-500, #444)')}; */
    border: 1px solid var(--Green-500, #444);
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

const Preview = () => {
    const selectMenu = useExecuteStore((v) => v.selectMenu);

    return (
        <>
            {selectMenu?.value === 'select' && <></>}
            {selectMenu && (
                <Container $isSelectMenu={!(selectMenu.value === 'select' || selectMenu.value === '')}>
                    <TitleTypo>{'EXECUTION PREVIEW'}</TitleTypo>
                    {(selectMenu.value === 'select' || selectMenu.value === '') && <DefaultView />}
                    {selectMenu.value === 'mint' && <MintPreview />}
                    {selectMenu.value === 'burn' && <BurnPreview />}
                    {selectMenu.value === 'burnFrom' && <BurnFromPreview />}
                    {selectMenu.value === 'transfer' && <TransferPreview />}
                    {selectMenu.value === 'transferFrom' && <TransferFromPreview />}
                    {selectMenu.value === 'updateMarketing' && <UpdateMarketingPreview />}
                    {selectMenu.value === 'increaseAllowance' && <IncreaseAllowancePreview />}
                    {selectMenu.value === 'decreaseAllowance' && <DecreaseAllowancePreview />}
                    {selectMenu.value === 'updateMinter' && <UpdateMinter />}
                    {selectMenu.value === 'updateLogo' && <UpdateLogo />}
                </Container>
            )}
        </>
    );
};

export default Preview;
