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
import SectionScrollToTopButton from '@/components/atoms/buttons/sectionScrolltoTopButton';
import { getTokenAmountFromUToken } from '@/utils/balance';
import commaNumber from 'comma-number';
import usePinContractStore from '@/store/pinContractStore';
import IconButton from '@/components/atoms/buttons/iconButton';
import { TOOLTIP_ID } from '@/constants/tooltip';
import PinButton from '@/components/atoms/buttons/pinButton';
import TextEllipsis from '@/components/atoms/ellipsis';

const Container = styled.div<{ $isSelectMenu?: boolean }>`
    width: 100%;
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

const TokenBox = styled.div`
    display: flex;
    padding: 20px 24px;
    align-items: center;
    justify-content: flex-start;
    gap: 28px;
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
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    // gap: 8px;
`;

const TokenTitleWrap = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;

    margin-bottom: 12px;
`;

const TokenSymbolTypo = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));

    /* Heading/H4 - Bd */
    font-family: 'General Sans Variable';
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 109.091% */
`;

const TokenNameTypo = styled.div`
    color: var(--Gray-650, #707070);

    /* Body/Body1 - Rg */
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
`;

const TotalAmountBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
`;

const TotalAmountTypo = styled.div`
    color: var(--Gray-650, #707070);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */

    white-space: pre;
`;

const TotalAmountValue = styled.div`
    color: #707070;

    /* Body/Body1 - Bd */
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
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
    border-radius: 6px;
    background: var(--200, #1e1e1e);
`;

const ContractTypeTypo = styled.div`
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
    { value: 'updateLogo', label: 'Update Logo', isDisabled: false }
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

    const { pinList, addPin, removePin } = usePinContractStore();
    const userPinList = pinList[address.toLowerCase()]?.filter((v) => v.type === 'cw20') || [];

    const isPinned = Boolean(userPinList?.find((v) => v.contractAddress.toLowerCase() === contractInfo?.address.toLowerCase()));

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
                ruleMenus[6] = { ...ruleMenus[6], isDisabled: true };
            }

            //! if marketing info not provided or marketing address is not connected address
            if (!marketingInfo || marketingInfo.marketing.toLowerCase() !== address.toLowerCase()) {
                ruleMenus[5] = { ...ruleMenus[5], isDisabled: true };
                ruleMenus[9] = { ...ruleMenus[9], isDisabled: true };
            }
        } else {
            ruleMenus = [...advancedMenuItems];

            //! if minter info not provided or minter address is not connected address
            if (!minterInfo || minterInfo.minter.toLowerCase() !== address.toLowerCase()) {
                ruleMenus[6] = { ...ruleMenus[6], isDisabled: true };
                ruleMenus[10] = { ...ruleMenus[10], isDisabled: true };
            }

            //! if marketing info not provided or marketing address is not connected address
            if (!marketingInfo || marketingInfo.marketing !== address) {
                ruleMenus[5] = { ...ruleMenus[5], isDisabled: true };
                ruleMenus[9] = { ...ruleMenus[9], isDisabled: true };
            }
        }

        return ruleMenus;
    }, [contractInfo, minterInfo, address, marketingInfo]);

    const handleChangeMenu = (menu: string) => {
        const _selectMenu = ownerMenus.find((item) => item.value === menu);

        setSelectMenu(_selectMenu);
    };

    const handleOnClickPin = (evt) => {
        if (address && contractInfo && tokenInfo) {
            if (isPinned) removePin(address, contractInfo.address);
            else
                addPin(address, {
                    type: 'cw20',
                    address: address,
                    contractAddress: contractInfo.address,
                    name: tokenInfo.name,
                    symbol: tokenInfo.symbol,
                    label: contractInfo.contract_info.label,
                    tokenLogoUrl: marketingInfo.logo.url
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
                        <TitleTypo>{'TOKEN INFO'}</TitleTypo>
                        <TokenBox style={{ position: 'relative' }}>
                            <TokenLogo src={validTokenLogoUrl} size="72px" />
                            <TokenInfoBox>
                                <TokenTitleWrap>
                                    {tokenInfo ? (
                                        <TokenSymbolTypo>{tokenInfo?.symbol}</TokenSymbolTypo>
                                    ) : (
                                        <Skeleton width="120px" height="24px" />
                                    )}

                                    <div style={{ width: '1px', height: '12px', background: 'var(--Gray-400, #2C2C2C)' }} />

                                    {tokenInfo ? (
                                        <TokenNameTypo className="clamp-single-line">{tokenInfo?.name}</TokenNameTypo>
                                    ) : (
                                        <Skeleton width="120px" height="24px" />
                                    )}
                                    {/* <ValidShieldIcon src={IC_VALID_SHIELD} alt={'Firmachain Valid Contract'} /> */}
                                    {ContractTypeLabel && (
                                        <ContractTypeLabelWrap style={{ marginRight: '40px' }}>
                                            <ContractTypeTypo>{ContractTypeLabel}</ContractTypeTypo>
                                        </ContractTypeLabelWrap>
                                    )}
                                    <div style={{ position: 'absolute', display: 'flex', right: '24px', top: '20px' }}>
                                        <PinButton isPinned={isPinned} isBlocked={userPinList.length >= 10} onClick={handleOnClickPin} />
                                    </div>
                                </TokenTitleWrap>

                                <Divider $direction={'horizontal'} $color="var(--Gray-400, #2C2C2C)" />
                                <div style={{ marginTop: '8px' }}>
                                    {tokenInfo ? (
                                        <TotalAmountBox>
                                            <TotalAmountTypo>Total Supply :</TotalAmountTypo>
                                            <TextEllipsis
                                                CustomDiv={TotalAmountValue}
                                                text={commaNumber(
                                                    getTokenAmountFromUToken(tokenInfo?.total_supply, String(tokenInfo?.decimals))
                                                )}
                                                breakMode={'letters'}
                                                className="total-supply-value"
                                            />
                                            {/* <div className="total-supply-value clamp-single-line">
                                                {commaNumber(
                                                    getTokenAmountFromUToken(tokenInfo?.total_supply, String(tokenInfo?.decimals))
                                                )}
                                            </div> */}
                                        </TotalAmountBox>
                                    ) : (
                                        <Skeleton width="80px" height="22px" />
                                    )}
                                </div>
                            </TokenInfoBox>
                        </TokenBox>
                    </TokenInfoWrap>

                    <ExecuteSelect
                        value={selectMenu?.value}
                        placeHolder="Select"
                        options={ownerMenus}
                        onChange={handleChangeMenu}
                        minWidth="214px"
                        maxWidth="214px"
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
                    {selectMenu?.value !== 'select' && (
                        <Fragment>
                            {/* <Divider $direction={'horizontal'} $variant="dash" $color="var(--Gray-750, #999)" /> */}
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
                </div>
            </Container>
            {!['select', '', 'increaseAllowance', 'decreaseAllowance', 'burn', 'updateMarketing', 'updateMinter', 'updateLogo'].includes(
                selectMenu.value
            ) && (
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

export default TokenInfo;
