import styled from 'styled-components';

import MintPreview from './previews/mint';
import DefaultView from './previews/default';
import useExecuteStore from '../hooks/useCW721ExecuteStore';
import BurnPreview from './previews/burn';
import TransferPreview from './previews/transfer';
import ApprovePreview from './previews/approve';

import UpdateOwnershipRenounce from './previews/updateOwnershipRenounce';
import UpdateOwnershipAccept from './previews/updateOwnershipAccept';
import RevokePreview from './previews/revoke';
import ApproveAllPreview from './previews/approveAll';
import RevokeAllPreview from './previews/revokeAll';
import UpdateOwnershipTransferPreview from './previews/updateOwnershipTransfer';

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
                    {selectMenu.value === 'transfer' && <TransferPreview />}
                    {selectMenu.value === 'approve' && <ApprovePreview />}
                    {selectMenu.value === 'updateOwnershipAccept' && <UpdateOwnershipAccept />}
                    {selectMenu.value === 'updateOwnershipRenounce' && <UpdateOwnershipRenounce />}
                    {selectMenu.value === 'revoke' && <RevokePreview />}
                    {selectMenu.value === 'approveAll' && <ApproveAllPreview />}
                    {selectMenu.value === 'revokeAll' && <RevokeAllPreview />}
                    {selectMenu.value === 'updateOwnershipTransfer' && <UpdateOwnershipTransferPreview />}
                </Container>
            )}
        </>
    );
};

export default Preview;
