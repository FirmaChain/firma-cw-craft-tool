import { Fragment, useEffect, useState } from 'react';

import styled from 'styled-components';

import ExecuteSelect from '@/components/atoms/select/executeSelect';
import Divider from '@/components/atoms/divider';
// import useCW721ExecuteStore from '../hooks/useCW721ExecuteStore';

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
import SectionScrollToTopButton from '@/components/atoms/buttons/sectionScrolltoTopButton';
import { CRAFT_CONFIGS } from '@/config';
import commaNumber from 'comma-number';
import PinButton from '@/components/atoms/buttons/pinButton';
import usePinContractStore from '@/store/pinContractStore';
import { useCW721Execute } from '@/context/cw721ExecuteContext';
import useWalletStore from '@/store/walletStore';

const Container = styled.div<{ $isSelectMenu?: boolean }>`
    width: 100%;
    height: fit-content;
    display: flex;
    // padding: 48px;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    align-self: stretch;
    // border-radius: 24px;
    // outline: ${(props) => (props.$isSelectMenu ? '1px solid var(--Green-500, #02e191) !important' : 'unset')};
    // background: var(--200, #1e1e1e);
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
    padding: 20px 24px 20px 28px;
    justify-content: center;
    // gap: 8px;
    align-self: stretch;
    border-radius: 16px;
    background: var(--Gray-150, #141414);

    min-height: 112px;
`;

const ContractSymbolTypo = styled.div`
    color: var(--Gray-650, #707070);

    /* Body/Body1 - Rg */
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
`;

const ContractNameTypo = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));

    /* Heading/H4 - Bd */
    font-family: 'General Sans Variable';
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 109.091% */
`;

const TotalSupplyTypo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;

    margin-top: 8px;

    .total-supply-value {
        color: #707070;

        /* Body/Body1 - Bd */
        font-family: 'General Sans Variable';
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 22px; /* 137.5% */
    }

    .total-supply-typo {
        color: var(--Gray-650, #707070);
        font-family: 'General Sans Variable';
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px; /* 142.857% */
    }
`;

const ContractTypeLabel = styled.div`
    display: flex;
    padding: 2px 12px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;

    border-radius: 6px;
    background: var(--200, #1e1e1e);

    color: var(--Gray-700, #807e7e);
    text-align: center;

    /* Body/Body2 - Md */
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
`;

const DisabledContainer = styled(Container)`
    user-select: none;
    border-color: #1e1e1e;
    display: flex;
    align-items: center;
    justify-content: center;

    min-height: 334px;

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

const ScrollButtonBox = styled.div`
    width: 100%;

    @media (max-width: 1653px) {
        display: none;
    }
`;

export interface IMenuItem {
    value: string;
    label: string;
    isDisabled: boolean;
}

const basicMenuItems: IMenuItem[] = [
    { value: 'select', label: 'Select', isDisabled: false },
    { value: 'transfer', label: 'Transfer', isDisabled: false },
    { value: 'approve', label: 'Approve', isDisabled: false },
    { value: 'approveAll', label: 'Approve All', isDisabled: false },
    { value: 'revoke', label: 'Revoke', isDisabled: false },
    { value: 'revokeAll', label: 'Revoke All', isDisabled: false },
    { value: 'mint', label: 'Mint', isDisabled: false },
    { value: 'burn', label: 'Burn', isDisabled: false },
    { value: 'updateOwnershipTransfer', label: 'Update Ownership Transfer', isDisabled: false },
    { value: 'updateOwnershipAccept', label: 'Update Ownership Accept', isDisabled: false },
    { value: 'updateOwnershipRenounce', label: 'Update Ownership Renounce', isDisabled: false }
];

const CW721ContractInfo = () => {
    const address = useWalletStore((v) => v.address);

    const context = useCW721Execute();

    const totalSupply = context.totalNfts;
    const selectMenu = context.selectMenu;
    const contractInfo = context.contractInfo;
    const nftContractInfo = context.nftContractInfo;
    const ownershipInfo = context.ownershipInfo;
    const blockHeight = context.blockHeight;
    const minter = context.minter;
    const setSelectMenu = context.setSelectMenu;
    const contractExist = context.contractExist;

    const { pinList, addPin, removePin } = usePinContractStore();
    const userPinList = pinList[address.toLowerCase()]?.filter((v) => v.type === 'cw721') || [];

    const isPinned = Boolean(userPinList?.find((v) => v.contractAddress.toLowerCase() === contractInfo?.address.toLowerCase()));

    const [ownerMenus, setOwnerMenus] = useState<IMenuItem[]>(basicMenuItems);

    useEffect(() => {
        const ruleMenus = basicMenuItems.map((item, index) => {
            let isDisabled = item.isDisabled;

            if (index === 6) {
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

    const handleOnClickPin = (evt) => {
        if (address && contractInfo && nftContractInfo) {
            if (isPinned) removePin(address, contractInfo.address);
            else
                addPin(address, {
                    type: 'cw721',
                    address: address,
                    contractAddress: contractInfo.address,
                    name: nftContractInfo.name,
                    symbol: nftContractInfo.symbol,
                    label: contractInfo.contract_info.label,
                    tokenLogoUrl: ''
                });
        }
    };

    return selectMenu && contractExist ? (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Container $isSelectMenu={selectMenu.value === 'select' || selectMenu.value === ''}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '44px 48px',
                        borderRadius: '24px',
                        gap: '24px',
                        background: 'var(--200, #1E1E1E)',
                        width: '100%',
                        outline: selectMenu?.value === 'select' ? '1px solid var(--Green-500, #02e191) !important' : 'unset'
                    }}
                >
                    <TokenInfoWrap>
                        <TitleTypo>{'NFT CONTRACT INFO'}</TitleTypo>
                        <ContractBox style={{ position: 'relative' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                <ContractNameTypo>{nftContractInfo ? nftContractInfo.name : 'NAME'}</ContractNameTypo>

                                <div style={{ width: '1px', height: '12px', background: 'var(--Gray-400, #2C2C2C)' }} />

                                <ContractSymbolTypo className="clamp-single-line" style={{ marginRight: '40px' }}>
                                    {nftContractInfo ? nftContractInfo.symbol : 'SYMBOL'}
                                </ContractSymbolTypo>

                                {/* <ContractTypeLabel>
                                    {contractInfo?.contract_info?.code_id === CRAFT_CONFIGS.CW721.ADVANCED_CODE_ID ? 'ADVANCED' : 'BASIC'}
                                </ContractTypeLabel> */}

                                <div style={{ position: 'absolute', display: 'flex', right: '24px', top: '20px' }}>
                                    <PinButton isPinned={isPinned} isBlocked={userPinList.length >= 10} onClick={handleOnClickPin} />
                                </div>
                            </div>

                            <Divider $direction={'horizontal'} $color="var(--Gray-400, #2C2C2C)" />

                            <TotalSupplyTypo>
                                <div className="total-supply-typo">Total Supply :</div>
                                <div className="total-supply-value">{commaNumber(totalSupply)}</div>
                                {/* <div className="token-symbol">{nftContractInfo ? nftContractInfo.symbol : 'SYMBOL'}</div> */}
                            </TotalSupplyTypo>
                        </ContractBox>
                    </TokenInfoWrap>
                    <ExecuteSelect
                        value={selectMenu?.value}
                        placeHolder="Select"
                        options={ownerMenus}
                        onChange={handleChangeMenu}
                        minWidth="280px"
                        maxWidth="280px"
                    />
                </div>
                <div
                    style={{
                        display: selectMenu?.value === 'select' ? 'none' : 'flex',
                        flexDirection: 'column',
                        padding: '44px 48px',
                        borderRadius: '24px',
                        gap: '24px',
                        background: 'var(--200, #1E1E1E)',
                        width: '100%'
                    }}
                >
                    {/* {selectMenu?.value === 'select' && <></>}
                    {selectMenu?.value !== 'select' && (
                        <Fragment>
                            <Divider $direction={'horizontal'} $variant="dash" $color="var(--Gray-750, #999)" />
                        </Fragment>
                    )} */}
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
                </div>
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
    ) : (
        <DisabledContainer>
            <div className="diabled-typo">There is no data</div>
        </DisabledContainer>
    );
};

export default CW721ContractInfo;
