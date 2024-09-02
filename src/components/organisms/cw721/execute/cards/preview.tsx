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
import { useScrollContext } from '@/context/scrollContext';

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
    border: 0px solid var(--Green-500, #444);
    background: var(--200, #1e1e1e);

    max-height: 742px;
    overflow: hidden;
    position: sticky;
    transition: top 0.2s ease;
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
    const { scroll } = useScrollContext();
    const selectMenu = useExecuteStore((v) => v.selectMenu);

    return (
        <>
            {selectMenu?.value === 'select' && <></>}
            {selectMenu && (
                <Container style={{ top: `${scroll.y + 36}px` }} $isSelectMenu={!(selectMenu.value === 'select' || selectMenu.value === '')}>
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
