import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import Icons from '@/components/atoms/icons';
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

export interface IMenuItem {
    value: string;
    label: string;
    isDisabled?: boolean;
}

const basicMenuItems: IMenuItem[] = [
    { value: 'select', label: 'Select' },
    { value: 'mint', label: 'Mint' },
    { value: 'burn', label: 'Burn' },
    { value: 'burnFrom', label: 'Burn From' },
    { value: 'increaseAllowance', label: 'Increase Allowance' },
    { value: 'decreaseAllowance', label: 'Decrease Allowance' },
    { value: 'transfer', label: 'Transfer' },
    { value: 'transferFrom', label: 'Transfer From' },
    { value: 'updateLogo', label: 'Update Logo' },
    { value: 'updateMinter', label: 'Update Minter' }
];

const advancedMenuItems: IMenuItem[] = [
    { value: 'select', label: 'Select' },
    { value: 'mint', label: 'Mint' },
    { value: 'burn', label: 'Burn' },
    { value: 'burnFrom', label: 'Burn From' },
    { value: 'increaseAllowance', label: 'Increase Allowance' },
    { value: 'decreaseAllowance', label: 'Decrease Allowance' },
    { value: 'transfer', label: 'Transfer' },
    { value: 'transferFrom', label: 'Transfer From' },
    { value: 'updateLogo', label: 'Update Logo' },
    { value: 'updateMarketing', label: 'Update Marketing' },
    { value: 'updateMinter', label: 'Update Minter' }
];

const TokenInfo = () => {
    const address = useSelector((state: rootState) => state.wallet.address);
    const network = useSelector((state: rootState) => state.global.network);

    const contractAddress = useExecuteStore((state) => state.contractAddress);
    const selectMenu = useExecuteStore((state) => state.selectMenu);
    const contractInfo = useExecuteStore((state) => state.contractInfo);
    const minterInfo = useExecuteStore((state) => state.minterInfo);
    const marketingInfo = useExecuteStore((state) => state.marketingInfo);
    const tokenInfo = useExecuteStore((state) => state.tokenInfo);
    const setSelectMenu = useExecuteStore((state) => state.setSelectMenu);

    const [validTokenLogoUrl, setValidTokenLogoUrl] = useState<string>('');
    const [ownerMenus, setOwnerMenus] = useState<IMenuItem[]>([]);

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

    const craftConfig = useMemo(() => {
        const config = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET : CRAFT_CONFIGS.TESTNET;
        return config;
    }, [network]);

    const ContractTypeLabel = useMemo(() => {
        const craftConfig = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET : CRAFT_CONFIGS.TESTNET;

        if (contractInfo) return contractInfo.contract_info.code_id === craftConfig.CW20.BASIC_CODE_ID ? 'BASIC' : 'ADVANCED';

        return false;
    }, [contractInfo, network]);

    useEffect(() => {
        let ruleMenus: IMenuItem[] = [];

        if (contractInfo && contractInfo.contract_info.code_id === craftConfig.CW20.BASIC_CODE_ID) {
            ruleMenus = [...basicMenuItems];

            if (minterInfo && minterInfo.minter !== address) {
                ruleMenus[1].isDisabled = true;
                ruleMenus[9].isDisabled = true;
            }

            if (marketingInfo && marketingInfo.marketing !== address) {
                ruleMenus[8].isDisabled = true;
            }
        } else {
            ruleMenus = [...advancedMenuItems];

            if (minterInfo && minterInfo.minter !== address) {
                ruleMenus[1].isDisabled = true;
                ruleMenus[10].isDisabled = true;
            }

            if (marketingInfo && marketingInfo.marketing !== address) {
                ruleMenus[8].isDisabled = true;
                ruleMenus[9].isDisabled = true;
            }
        }

        setOwnerMenus(ruleMenus);
    }, [craftConfig, contractAddress, minterInfo, marketingInfo]);

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
                        <TitleTypo>{'TOKEN INFO'}</TitleTypo>
                        <TokenBox>
                            <TokenLogo src={validTokenLogoUrl} size="72px" />
                            <TokenInfoBox>
                                <TokenTitleWrap>
                                    {tokenInfo ? (
                                        <TokenSymbolTypo>{tokenInfo?.symbol}</TokenSymbolTypo>
                                    ) : (
                                        <Skeleton width="120px" height="24px" />
                                    )}
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
            )}
        </>
    );
};

export default TokenInfo;
