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
import SectionScrollToTopButton from '@/components/atoms/buttons/sectionScrolltoTopButton';

const Container = styled.div<{ $isSelectMenu: boolean; $scrollY: number }>`
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
    min-height: ${({ $isSelectMenu }) => (!$isSelectMenu ? '334px' : 'unset')};
    overflow: hidden;
    position: sticky;
    transition: all 0.2s ease;

    @media (min-width: 1654px) {
        position: sticky;
        margin-bottom: ${({ $isSelectMenu }) => ($isSelectMenu ? '72px' : '0')};
        min-height: ${({ $isSelectMenu }) => (!$isSelectMenu ? '334px' : 'unset')};

        max-height: ${({ $scrollY, $isSelectMenu }) =>
            !$isSelectMenu ? '100%' : $scrollY > 240 ? 'calc(100vh - 200px)' : 'calc(100vh - 340px)'};
        top: ${({ $scrollY, $isSelectMenu }) => ($scrollY > 0 && $isSelectMenu ? '100px' : 0)};
    }
`;

const TitleTypo = styled.div`
    color: var(--Gray-800, #e6e6e6);
    font-family: 'General Sans Variable';
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
`;

const ScrollButtonBox = styled.div`
    width: 100%;

    @media (min-width: 1654px) {
        display: none;
    }
`;

const Preview = () => {
    const { scroll } = useScrollContext();
    const selectMenu = useExecuteStore((v) => v.selectMenu);

    return (
        <>
            {selectMenu?.value === 'select' && <></>}
            {selectMenu && (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Container $isSelectMenu={!(selectMenu.value === 'select' || selectMenu.value === '')} $scrollY={scroll.y}>
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
                    {![
                        'select',
                        '',
                        'burn',
                        'approve',
                        'revoke',
                        'approveAll',
                        'revokeAll',
                        'updateOwnershipTransfer',
                        'updateOwnershipAccept',
                        'updateOwnershipRenounce'
                    ].includes(selectMenu.value) && (
                        <ScrollButtonBox>
                            <SectionScrollToTopButton />
                        </ScrollButtonBox>
                    )}
                </div>
            )}
        </>
    );
};

export default Preview;
