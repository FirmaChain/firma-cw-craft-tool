import { Fragment, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { rootState } from '@/redux/reducers';
import ExecuteSelect from '@/components/atoms/select/executeSelect';
import { CRAFT_CONFIGS } from '@/config';
import Skeleton from '@/components/atoms/skeleton';
import Divider from '@/components/atoms/divider';
import useCW721ExecuteStore from '../hooks/useCW721ExecuteStore';

import Mint from './functions/mint';
import Burn from './functions/burn';
import Transfer from './functions/transfer';
import Approve from './functions/approve';
import UpdateOwnershipRenounce from './functions/updateOwnershipRenounce';
import UpdateOwnershipAccept from './functions/updateOwnershipAccept';
import Revoke from './functions/revoke';
import ApproveAll from './functions/approveAll';
import RevokeAll from './functions/revokeAll';
import UpdateOwnershipTransfer from './functions/updateOwnershipTransfer';

const Container = styled.div<{ $isSelectMenu?: boolean }>`
    width: 100%;
    height: fit-content;
    display: flex;
    padding: 48px;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
    align-self: stretch;
    border-radius: 24px;
    /* border: ; */
    border: ${(props) => (props.$isSelectMenu ? '1px solid var(--Green-500, #02e191)' : '1px solid var(--Green-500, #444)')};
    background: var(--200, #1e1e1e);
`;

const TokenInfoWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const TitleTypo = styled.div`
    color: var(--Gray-800, #e6e6e6);
    font-family: 'General Sans Variable';
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
`;

const ContractBox = styled.div`
    display: flex;
    flex-direction: column;
    padding: 28px 36px;
    justify-content: flex-start;
    gap: 8px;
    align-self: stretch;
    border-radius: 16px;
    background: var(--Gray-150, #141414);
`;

const ContractSymbolTypo = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    font-family: 'General Sans Variable';
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 109.091% */
`;

const ContractNameTypo = styled.div`
    color: var(--Gray-650, #707070);
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
`;

const DisabledContainer = styled(Container)`
    user-select: none;
    border-color: #1e1e1e;
    display: flex;
    align-items: center;
    justify-content: center;

    min-height: 322px;

    .diabled-typo {
        color: var(--Gray-800, #dcdcdc);

        /* Body/Body2 - Rg */
        font-family: 'General Sans Variable';
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px; /* 142.857% */
    }
`;

export interface IMenuItem {
    value: string;
    label: string;
    isDisabled: boolean;
}

const basicMenuItems: IMenuItem[] = [
    { value: 'select', label: 'Select', isDisabled: false },
    { value: 'mint', label: 'Mint', isDisabled: false },
    { value: 'burn', label: 'Burn', isDisabled: false },
    { value: 'transfer', label: 'Transfer', isDisabled: false },
    { value: 'approve', label: 'Approve', isDisabled: false },
    { value: 'revoke', label: 'Revoke', isDisabled: false },
    { value: 'approveAll', label: 'Approve All', isDisabled: false },
    { value: 'revokeAll', label: 'Revoke All', isDisabled: false },
    { value: 'updateOwnershipTransfer', label: 'Update Ownership Transfer', isDisabled: false },
    { value: 'updateOwnershipAccept', label: 'Update Ownership Accept', isDisabled: false },
    { value: 'updateOwnershipRenounce', label: 'Update Ownership Renounce', isDisabled: false }
];

const CW721ContractInfo = () => {
    const address = useSelector((state: rootState) => state.wallet.address);

    const selectMenu = useCW721ExecuteStore((state) => state.selectMenu);
    const nftContractInfo = useCW721ExecuteStore((state) => state.nftContractInfo);
    const ownershipInfo = useCW721ExecuteStore((state) => state.ownershipInfo);
    const blockHeight = useCW721ExecuteStore((state) => state.blockHeight);
    const minter = useCW721ExecuteStore((state) => state.minter);
    const setSelectMenu = useCW721ExecuteStore((state) => state.setSelectMenu);

    const contractExist = useCW721ExecuteStore((v) => v.contractExist);

    const [ownerMenus, setOwnerMenus] = useState<IMenuItem[]>(basicMenuItems);

    useEffect(() => {
        const ruleMenus = basicMenuItems.map((item, index) => {
            let isDisabled = item.isDisabled;

            if (index === 1) {
                isDisabled = minter === '' || minter !== address;
            }

            if (index === 8 || index === 10) {
                isDisabled = ownershipInfo && ownershipInfo.owner !== '' && ownershipInfo.owner !== address;
            }

            if (index === 9) {
                isDisabled = ownershipInfo && minter !== '' && ownershipInfo.pending_owner !== address;
            }

            return { ...item, isDisabled };
        });

        setOwnerMenus(ruleMenus);
    }, [ownershipInfo, address, blockHeight, minter, setOwnerMenus]);

    const handleChangeMenu = (menu: string) => {
        const _selectMenu = ownerMenus.find((item) => item.value === menu);

        setSelectMenu(_selectMenu);
    };

    return selectMenu && contractExist ? (
        <Container $isSelectMenu={selectMenu.value === 'select' || selectMenu.value === ''}>
            <TokenInfoWrap>
                <TitleTypo>{'NFT CONTRACT INFO'}</TitleTypo>
                <ContractBox>
                    <ContractSymbolTypo>{nftContractInfo ? nftContractInfo.symbol : 'SYMBOL'}</ContractSymbolTypo>
                    <ContractNameTypo>{nftContractInfo ? nftContractInfo.name : 'NAME'}</ContractNameTypo>
                </ContractBox>
            </TokenInfoWrap>
            <ExecuteSelect
                value={selectMenu?.value}
                placeHolder="Select"
                options={ownerMenus}
                onChange={handleChangeMenu}
                minWidth="280px"
            />
            {selectMenu?.value === 'select' && <></>}
            {selectMenu?.value !== 'select' && (
                <Fragment>
                    <Divider $direction={'horizontal'} $variant="dash" $color="var(--Gray-750, #999)" />
                </Fragment>
            )}
            {selectMenu?.value === 'mint' && <Mint />}
            {selectMenu?.value === 'burn' && <Burn />}
            {selectMenu?.value === 'transfer' && <Transfer />}
            {selectMenu?.value === 'approve' && <Approve />}
            {selectMenu?.value === 'revoke' && <Revoke />}
            {selectMenu?.value === 'approveAll' && <ApproveAll />}
            {selectMenu?.value === 'revokeAll' && <RevokeAll />}
            {selectMenu?.value === 'updateOwnershipTransfer' && <UpdateOwnershipTransfer />}
            {selectMenu?.value === 'updateOwnershipAccept' && <UpdateOwnershipAccept />}
            {selectMenu?.value === 'updateOwnershipRenounce' && <UpdateOwnershipRenounce />}
        </Container>
    ) : (
        <DisabledContainer>
            <div className="diabled-typo">There is no data</div>
        </DisabledContainer>
    );
};

export default CW721ContractInfo;
