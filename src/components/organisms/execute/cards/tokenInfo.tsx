import { Fragment, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import Mint from './functions/mint';
import Burn from './functions/burn';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import BurnFrom from './functions/burnFrom';
import Transfer from './functions/transfer';
import UpdateMarketing from './functions/updateMarketing';
import IncreaseAllowance from './functions/increaseAllowance';
import DecreaseAllowance from './functions/decreaseAllowance';
import TransferFrom from './functions/transferFrom';
import UpdateMinter from './functions/updateMinter';
import ExecuteSelect from '@/components/atoms/select/executeSelect';
import { CRAFT_CONFIGS } from '@/config';
import UpdateLogo from './functions/updateLogo';
import useExecuteStore from '../hooks/useExecuteStore';
import Skeleton from '@/components/atoms/skeleton';
import Divider from '@/components/atoms/divider';
import TokenLogo from '@/components/atoms/icons/TokenLogo';

const Container = styled.div<{ $isSelectMenu?: boolean }>`
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

const TokenBox = styled.div`
    display: flex;
    padding: 20px 24px;
    align-items: center;
    justify-content: flex-start;
    gap: 32px;
    align-self: stretch;
    border-radius: 16px;
    background: var(--Gray-150, #141414);
`;

const ImageWrap = styled.div`
    width: 72px;
    height: 72px;
    flex-shrink: 0;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

const TokenInfoBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 8px;
`;

const TokenTitleWrap = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 8px;
`;

const TokenSymbolTypo = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    font-family: 'General Sans Variable';
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 109.091% */
`;

const TokenNameTypo = styled.div`
    color: var(--Gray-700, #999);
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
`;

const ValidShieldIcon = styled.img`
    width: 24px;
    height: 24px;
`;

const ContractTypeLabelWrap = styled.div`
    display: flex;
    padding: 2px 12px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 24px;
    border: 1px solid var(--Gray-550, #444);
`;

const ContractTypeTypo = styled.div`
    color: var(--Gray-700, #999);
    text-align: center;
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
    isDisabled?: boolean;
}

const basicMenuItems: IMenuItem[] = [
    { value: 'select', label: 'Select', isDisabled: false },
    { value: 'transfer', label: 'Transfer', isDisabled: false },
    { value: 'transferFrom', label: 'Transfer From', isDisabled: false },
    { value: 'increaseAllowance', label: 'Increase Allowance', isDisabled: false },
    { value: 'decreaseAllowance', label: 'Decrease Allowance', isDisabled: false },
    { value: 'updateMarketing', label: 'Update Marketing', isDisabled: false },
    { value: 'mint', label: 'Mint', isDisabled: false },
    { value: 'burn', label: 'Burn', isDisabled: false },
    { value: 'burnFrom', label: 'Burn From', isDisabled: false },
    { value: 'updateLogo', label: 'Update Logo', isDisabled: false },
];

const advancedMenuItems: IMenuItem[] = [
    { value: 'select', label: 'Select', isDisabled: false },
    { value: 'transfer', label: 'Transfer', isDisabled: false },
    { value: 'transferFrom', label: 'Transfer From', isDisabled: false },
    { value: 'increaseAllowance', label: 'Increase Allowance', isDisabled: false },
    { value: 'decreaseAllowance', label: 'Decrease Allowance', isDisabled: false },
    { value: 'updateMarketing', label: 'Update Marketing', isDisabled: false },
    { value: 'mint', label: 'Mint', isDisabled: false },
    { value: 'burn', label: 'Burn', isDisabled: false },
    { value: 'burnFrom', label: 'Burn From', isDisabled: false },
    { value: 'updateLogo', label: 'Update Logo', isDisabled: false },
    { value: 'updateMinter', label: 'Update Minter', isDisabled: false }
];

const TokenInfo = () => {
    const address = useSelector((state: rootState) => state.wallet.address);

    const selectMenu = useExecuteStore((state) => state.selectMenu);
    const contractInfo = useExecuteStore((state) => state.contractInfo);
    const minterInfo = useExecuteStore((state) => state.minterInfo);
    const marketingInfo = useExecuteStore((state) => state.marketingInfo);
    const tokenInfo = useExecuteStore((state) => state.tokenInfo);
    const setSelectMenu = useExecuteStore((state) => state.setSelectMenu);

    const contractExist = useExecuteStore((v) => v.contractExist);

    const [validTokenLogoUrl, setValidTokenLogoUrl] = useState<string>('');

    useEffect(() => {
        if (marketingInfo && marketingInfo.logo) {
            const img = new Image();
            img.src = marketingInfo.logo.url;
            img.onload = () => {
                setValidTokenLogoUrl(marketingInfo.logo.url);
            };
            img.onerror = () => {
                setValidTokenLogoUrl('');
            };
        } else {
            setValidTokenLogoUrl('');
        }
    }, [marketingInfo]);

    const ContractTypeLabel = useMemo(() => {
        if (contractInfo) return contractInfo.contract_info.code_id === CRAFT_CONFIGS.CW20.BASIC_CODE_ID ? 'BASIC' : 'ADVANCED';

        return false;
    }, [contractInfo]);

    const ownerMenus = useMemo(() => {
        let ruleMenus: IMenuItem[] = [];

        if (!contractInfo) return [];

        const isBasic = contractInfo.contract_info.code_id === CRAFT_CONFIGS.CW20.BASIC_CODE_ID;

        if (isBasic) {
            ruleMenus = [...basicMenuItems];

            //! if minter info not provided or minter address is not connected address
            if (!minterInfo || minterInfo.minter.toLowerCase() !== address.toLowerCase()) {
                ruleMenus[1] = { ...ruleMenus[1], isDisabled: true };
            }
            //  else {
            //     ruleMenus[1] = { ...ruleMenus[1], isDisabled: false };
            //     ruleMenus[9] = { ...ruleMenus[9], isDisabled: true };
            // }

            //! if marketing info not provided or marketing address is not connected address
            if (!marketingInfo || marketingInfo.marketing.toLowerCase() !== address.toLowerCase()) {
                ruleMenus[8] = { ...ruleMenus[8], isDisabled: true };
                ruleMenus[9] = { ...ruleMenus[9], isDisabled: true };
            }
            //  else {
            //     ruleMenus[8] = { ...ruleMenus[8], isDisabled: false };
            // }
        } else {
            ruleMenus = [...advancedMenuItems];

            //! if minter info not provided or minter address is not connected address
            if (!minterInfo || minterInfo.minter.toLowerCase() !== address.toLowerCase()) {
                ruleMenus[1] = { ...ruleMenus[1], isDisabled: true };
                ruleMenus[10] = { ...ruleMenus[10], isDisabled: true };
            }
            //  else {
            //     ruleMenus[1] = { ...ruleMenus[1], isDisabled: false };
            //     ruleMenus[10] = { ...ruleMenus[10], isDisabled: false };
            // }

            //! if marketing info not provided or marketing address is not connected address
            if (!marketingInfo || marketingInfo.marketing !== address) {
                ruleMenus[8] = { ...ruleMenus[8], isDisabled: true };
                ruleMenus[9] = { ...ruleMenus[9], isDisabled: true };
            }
            //  else {
            //     ruleMenus[8] = { ...ruleMenus[8], isDisabled: false };
            //     ruleMenus[9] = { ...ruleMenus[9], isDisabled: false };
            // }
        }

        return ruleMenus;
    }, [contractInfo, minterInfo, address, marketingInfo]);

    const handleChangeMenu = (menu: string) => {
        console.log('menu', menu);
        const _selectMenu = ownerMenus.find((item) => item.value === menu);

        setSelectMenu(_selectMenu);
    };

    return selectMenu && contractExist ? (
        <Container $isSelectMenu={selectMenu.value === 'select' || selectMenu.value === ''}>
            <TokenInfoWrap>
                <TitleTypo>{'TOKEN INFO'}</TitleTypo>
                <TokenBox>
                    <TokenLogo src={validTokenLogoUrl} size="72px" />
                    <TokenInfoBox>
                        <TokenTitleWrap>
                            {tokenInfo ? <TokenSymbolTypo>{tokenInfo?.symbol}</TokenSymbolTypo> : <Skeleton width="120px" height="24px" />}
                            {/* <ValidShieldIcon src={IC_VALID_SHIELD} alt={'Firmachain Valid Contract'} /> */}
                            {ContractTypeLabel && (
                                <ContractTypeLabelWrap>
                                    <ContractTypeTypo>{ContractTypeLabel}</ContractTypeTypo>
                                </ContractTypeLabelWrap>
                            )}
                        </TokenTitleWrap>
                        {tokenInfo ? <TokenNameTypo>{tokenInfo?.name}</TokenNameTypo> : <Skeleton width="80px" height="22px" />}
                    </TokenInfoBox>
                </TokenBox>
            </TokenInfoWrap>
            <ExecuteSelect
                value={selectMenu?.value}
                placeHolder="Select"
                options={ownerMenus}
                onChange={handleChangeMenu}
                minWidth="214px"
            />
            {selectMenu?.value === 'select' && <></>}
            {selectMenu?.value !== 'select' && (
                <Fragment>
                    <Divider $direction={'horizontal'} $variant="dash" $color="var(--Gray-750, #999)" />
                    {selectMenu?.value === 'mint' && <Mint />}
                    {selectMenu?.value === 'burn' && <Burn />}
                    {selectMenu?.value === 'burnFrom' && <BurnFrom />}
                    {selectMenu?.value === 'transfer' && <Transfer />}
                    {selectMenu?.value === 'transferFrom' && <TransferFrom />}
                    {selectMenu?.value === 'increaseAllowance' && <IncreaseAllowance />}
                    {selectMenu?.value === 'decreaseAllowance' && <DecreaseAllowance />}
                    {selectMenu?.value === 'updateMarketing' && <UpdateMarketing />}
                    {selectMenu?.value === 'updateMinter' && <UpdateMinter />}
                    {selectMenu?.value === 'updateLogo' && <UpdateLogo />}
                </Fragment>
            )}
        </Container>
    ) : (
        <DisabledContainer>
            <div className="diabled-typo">There is no data</div>
        </DisabledContainer>
    );
};

export default TokenInfo;
