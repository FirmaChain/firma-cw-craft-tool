import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Icons from '@/components/atoms/icons';
import { rootState } from '@/redux/reducers';
import ExecuteSelect from '@/components/atoms/select/executeSelect';
import { CRAFT_CONFIGS } from '@/config';
import Skeleton from '@/components/atoms/skeleton';
import Divider from '@/components/atoms/divider';
import TokenLogo from '@/components/atoms/icons/TokenLogo';

import useCW721ExecuteStore from '../hooks/useCW721ExecuteStore';
import Mint from './functions/mint';
import Burn from './functions/burn';
import Transfer from './functions/transfer';
import Approve from './functions/approve';
import Revoke from './functions/revoke';
import ApproveAll from './functions/approveAll';
import RevokeAll from './functions/revokeAll';
import UpdateOwnershipTransfer from './functions/updateOwnershipTransfer';

const Container = styled.div<{ $isSelectMenu: boolean }>`
    width: 100%;
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

export interface IMenuItem {
    value: string;
    label: string;
    isDisabled?: boolean;
}

const basicMenuItems: IMenuItem[] = [
    { value: 'select', label: 'Select' },
    { value: 'mint', label: 'Mint' },
    { value: 'burn', label: 'Burn' },
    { value: 'transfer', label: 'Transfer' },
    { value: 'approve', label: 'Approve' },
    { value: 'revoke', label: 'Revoke' },
    { value: 'approveAll', label: 'Approve All' },
    { value: 'revokeAll', label: 'Revoke All' },
    { value: 'updateOwnershipTransfer', label: 'Update Ownership Transfer' },
    { value: 'updateOwnershipAccept', label: 'Update Ownership Accept' },
    { value: 'updateOwnershipRenounce', label: 'Update Ownership Renounce' }
];

const advancedMenuItems: IMenuItem[] = [
    { value: 'select', label: 'Select' },
    { value: 'mint', label: 'Mint' },
    { value: 'burn', label: 'Burn' },
    { value: 'transfer', label: 'Transfer' },
    { value: 'approve', label: 'Approve' },
    { value: 'revoke', label: 'Revoke' },
    { value: 'approveAll', label: 'Approve All' },
    { value: 'revokeAll', label: 'Revoke All' },
    { value: 'updateOwnershipTransfer', label: 'Update Ownership Transfer' },
    { value: 'updateOwnershipAccept', label: 'Update Ownership Accept' },
    { value: 'updateOwnershipRenounce', label: 'Update Ownership Renounce' }
];

const CW721ContractInfo = () => {
    const address = useSelector((state: rootState) => state.wallet.address);
    const network = useSelector((state: rootState) => state.global.network);

    const contractAddress = useCW721ExecuteStore((state) => state.contractAddress);
    const selectMenu = useCW721ExecuteStore((state) => state.selectMenu);
    const contractInfo = useCW721ExecuteStore((state) => state.contractInfo);
    const nftContractInfo = useCW721ExecuteStore((state) => state.nftContractInfo);
    const setSelectMenu = useCW721ExecuteStore((state) => state.setSelectMenu);

    const [ownerMenus, setOwnerMenus] = useState<IMenuItem[]>(basicMenuItems);

    const craftConfig = useMemo(() => {
        const config = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET : CRAFT_CONFIGS.TESTNET;
        return config;
    }, [network]);

    const handleChangeMenu = (menu: string) => {
        console.log('menu', menu);
        const _selectMenu = ownerMenus.find((item) => item.value === menu);

        setSelectMenu(_selectMenu);
    };

    return (
        <>
            {selectMenu && (
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
                </Container>
            )}
        </>
    );
};

export default CW721ContractInfo;
